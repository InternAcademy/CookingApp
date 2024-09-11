namespace CookingApp.Services.Stripe
{
    using AutoMapper;
    using CookingApp.Common.Helpers.Profiles;
    using CookingApp.Infrastructure.Configurations.Stripe;
    using CookingApp.Infrastructure.Exceptions;
    using CookingApp.Infrastructure.Interfaces;
    using CookingApp.Models;
    using CookingApp.ViewModels.Stripe.Customer;
    using CookingApp.ViewModels.Stripe.Product;
    using CookingApp.ViewModels.Stripe.Statistics;
    using CookingApp.ViewModels.Stripe.Subscription;
    using global::Stripe;
    using global::Stripe.Checkout;
    using Microsoft.Extensions.Options;
    using MongoDB.Driver.Core.Events;
    using static CookingApp.Common.ExceptionMessages;
    public class StripeService(CustomerService customerService,
        PriceService priceService,
        ProductService productService,
        SubscriptionService subscriptionService,
        BalanceTransactionService balanceTransactionService,
        InvoiceService invoiceService,
        IOptions<StripeOptions> stripeOptions,
        SessionService sessionService,
        IRepository<UserProfile> userRepo,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper) : IStripeService
    {
        /// <summary>
        /// Gets all products that are in the Stripe account.
        /// </summary>
        public async Task<IEnumerable<StripeProduct>> GetProductsAsync()
        {
            var options = new ProductListOptions { Active = true, };

            var products = await productService.ListAsync(options);
            var result = new List<StripeProduct>();

            foreach (var product in products)
            {
                
                var price = await priceService.GetAsync(product.DefaultPriceId);
                result.Add(new StripeProduct()
                {
                    Name = product.Name,
                    PriceId = price.Id,
                    Price = price.UnitAmountDecimal ?? 0m,
                    Type = price.Type == "recurring" ? "subscription" : "pack",
                    Benefits = product.Metadata
                });
            }

            return result;
        }



        /// <summary>
        /// Creates a subscription with a status "default_incomplete" because the subscription
        /// requires a payment. It automatically generates an an initial Invoice.
        /// Once the initial Invoice is payed the status then is set to active.
        /// If the Invoice is not payed in 23 hours the status then is set to "incomplete_expired"
        /// </summary>
         public async Task<InvoiceCreationResponse> CreateSubscriptionAsync(InvoiceCreation model)
        {
            if (model == null ||
                string.IsNullOrEmpty(model.Email) ||
                string.IsNullOrEmpty(model.PriceId))
            {
                throw new ArgumentException(Stripe.NullOrEmptyInputValues);
            }

            var userId = GetUser.ProfileId(httpContextAccessor);

            var profile = await userRepo.GetFirstOrDefaultAsync(x=>x.UserId == userId);
            

            if(profile is null)
            {
                throw new NotFoundException();
            }
            
            var options = new SessionCreateOptions
                {
                    SuccessUrl = $"{stripeOptions.Value.SuccessRoute}",
                    Mode = "subscription",
                    LineItems = new List<SessionLineItemOptions>
                        {
                            new SessionLineItemOptions
                            {
                                Price = model.PriceId,
                                Quantity = 1,
                            },
                        },
                    AutomaticTax = new SessionAutomaticTaxOptions
                    {
                        Enabled = true
                    },
                    CustomerUpdate = new SessionCustomerUpdateOptions
                    {
                        Address = "auto"
                    }
            };

            if(profile.StripeId is not null)
            {
                var customer = await customerService.GetAsync(profile.StripeId);
                var subscriptionListOptions = new SubscriptionListOptions
                {
                    Customer = customer.Id,
                };

                var subscriptions = await subscriptionService.ListAsync(subscriptionListOptions);
                if(subscriptions.Any())
                {
                    if(subscriptions.Any(sub=>sub.Status=="active"))
                    {
                        throw new ArgumentException(Stripe.TheUserIsAlreadySubscribed);
                    }
                }
                options.Customer=profile.StripeId;
            }

            else
            {
                var customer = await customerService.CreateAsync(new CustomerCreateOptions(){Email=model.Email});
                options.Customer = customer.Id;
                profile.StripeId = customer.Id;
                await userRepo.UpdateAsync(profile);
            }

            var session = await sessionService.CreateAsync(options);         


            return new InvoiceCreationResponse(
               session.Url
            );
        }

        public async Task<InvoiceCreationResponse> BuyPackAsync(InvoiceCreation model)
        {
            if (model == null ||
               string.IsNullOrEmpty(model.Email) ||
               string.IsNullOrEmpty(model.PriceId))
            {
                throw new ArgumentException(Stripe.NullOrEmptyInputValues);
            }

            var userId = GetUser.ProfileId(httpContextAccessor);

            var profile = await userRepo.GetFirstOrDefaultAsync(x => x.UserId == userId);


            if (profile is null)
            {
                throw new NotFoundException();
            }

            var options = new SessionCreateOptions
            {
                SuccessUrl = $"{stripeOptions.Value.SuccessRoute}",
                Mode = "payment",
                LineItems = new List<SessionLineItemOptions>
                        {
                            new SessionLineItemOptions
                            {
                                Price = model.PriceId,
                                Quantity = 1,
                            },
                        },
                AutomaticTax = new SessionAutomaticTaxOptions
                {
                    Enabled = true
                },
                CustomerUpdate = new SessionCustomerUpdateOptions
                {
                    Address = "auto"
                }
            };

            if (profile.StripeId is not null)
            {
                var customer = await customerService.GetAsync(profile.StripeId);
                options.Customer = profile.StripeId;
            }
            else
            {
                var customer = await customerService.CreateAsync(new CustomerCreateOptions() { Email = model.Email });
                options.Customer = customer.Id;
                profile.StripeId = customer.Id;
                await userRepo.UpdateAsync(profile);
            }

            var session = await sessionService.CreateAsync(options);


            return new InvoiceCreationResponse(
               session.Url
            );
        }



        /// <summary>
        /// Cancels a subscription immediatly. The customer will not be charged again for the subscription
        /// </summary>
        public async Task<SubscriptionCancellationResponse> CancelSubscriptionAsync(string subscriptionId)
        {
            ArgumentException.ThrowIfNullOrEmpty(subscriptionId);
            var sub = await subscriptionService.GetAsync(subscriptionId);
            var options = new SubscriptionUpdateOptions
            {
                CancelAtPeriodEnd=true
            };
            subscriptionService.Update(subscriptionId, options);


            return new SubscriptionCancellationResponse(sub.CurrentPeriodEnd);
        }

        public async Task<List<CustomerData>> GetAllSubs()
        {
            var options = new SubscriptionListOptions
            {
                Status = "active"
            };

            var subscriptions = await subscriptionService.ListAsync(options);
            var allActiveUsers = new List<CustomerData>();

            foreach (var subscription in subscriptions)
            {
                var customer = await customerService.GetAsync(subscription.CustomerId);
                var customerModel = mapper.Map<CustomerData>(customer);
                allActiveUsers.Add(customerModel);
            }

            return allActiveUsers;
        }

        public async Task<CustomerData> GetSubscription()
        {
            var user = await GetUser.Profile(httpContextAccessor, userRepo);
            var stripeCustomer = await customerService.GetAsync(user.StripeId);
            var customer = mapper.Map<CustomerData>(stripeCustomer);

            var subscriptionListOptions = new SubscriptionListOptions
            {
                Customer = customer.Id,
            };

            var subscriptions = await subscriptionService.ListAsync(subscriptionListOptions);
            customer.Subscriptions = mapper.Map<List<SubscriptionState>>(subscriptions.Data);

            var sub = await subscriptionService.GetAsync(subscriptions.First().Id);
            if (sub.Items != null && sub.Items.Data.Count > 0)
            { 
                var subscriptionItem = sub.Items.Data.First();
                var priceId = subscriptionItem.Price.Id;
                var price = await priceService.GetAsync(priceId);
                customer.Subscriptions.First().Price = price.UnitAmountDecimal/100;

            }
        
            return customer;
        }

        public async Task<SubscriptionStatistics> GetSubsStats()
        {
            var subStats = new SubscriptionStatistics();

            var activeOptions = new SubscriptionListOptions()
            {
                Status = "active"
            };

            var canceledOptions = new SubscriptionListOptions()
            {
                Status = "canceled"
            };

            var activeSubscriptions = await subscriptionService.ListAsync(activeOptions);
            var canceledSubscriptions = await subscriptionService.ListAsync(canceledOptions);

            subStats.ActiveSubscriptions = activeSubscriptions.Data.Count;
            subStats.CanceledSubscriptions = canceledSubscriptions.Data.Count;

            return subStats;
        }

        public async Task<IncomeStatistics> GetIncome30DaysBack()
        {
            var incomeStat = new IncomeStatistics();

            var options = new BalanceTransactionListOptions()
            {
                Created = new DateRangeOptions
                {
                    GreaterThanOrEqual = DateTime.UtcNow.AddDays(-30),
                    LessThanOrEqual = DateTime.UtcNow
                }
            };

            var last30DayTransactions = await balanceTransactionService.ListAsync(options);

            incomeStat.TotalTransactions = last30DayTransactions.Count();

            foreach (var transaction in last30DayTransactions)
            {
                incomeStat.Total += transaction.Amount;
                incomeStat.AmountAfterTax += transaction.Amount - transaction.Fee;
            }

            return incomeStat;
        }

    }
}
