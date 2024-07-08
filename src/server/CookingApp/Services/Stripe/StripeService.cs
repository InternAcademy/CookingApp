namespace CookingApp.Services.Stripe
{
    using AutoMapper;
    using CookingApp.ViewModels.Stripe.Customer;
    using CookingApp.ViewModels.Stripe.Statistics;
    using CookingApp.ViewModels.Stripe.Subscription;
    using global::Stripe;
    using static CookingApp.Common.ExceptionMessages;
    using Product = ViewModels.Stripe.Product;

    public class StripeService(CustomerService customerService,
        PriceService priceService,
        ProductService productService,
        SubscriptionService subscriptionService,
        IMapper mapper) : IStripeService
    {
        /// <summary>
        /// Gets all products that are in the Stripe account.
        /// </summary>
        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            var options = new ProductListOptions { Limit = 3 };

            var products = await productService.ListAsync(options);
            var result = new List<Product>();

            foreach (var product in products)
            {

                var price = await priceService.GetAsync(product.DefaultPriceId);
                result.Add(
                    new Product(product.Id,
                    product.Name,
                    price.UnitAmount,
                    product.DefaultPriceId,
                    product.Description,
                    price.Recurring.Interval));
            }

            return result;
        }

        /// <summary>
        /// Creates a subscription with a status "default_incomplete" because the subscription
        /// requires a payment. It automatically generates an an initial Invoice.
        /// Once the initial Invoice is payed the status then is set to active.
        /// If the Invoice is not payed in 23 hours the status then is set to "incomplete_expired"
        /// </summary>
        public async Task<SubscriptionCreationResponse> CreateSubscriptionAsync(SubscriptionCreation model)
        {
            if (model == null ||
                string.IsNullOrEmpty(model.Email) ||
                string.IsNullOrEmpty(model.PriceId))
            {
                throw new ArgumentException(NullOrEmptyInputValues);
            }
            var options = new CustomerCreateOptions
            {
                Email = model.Email
            };
            var customer = await customerService.CreateAsync(options);
            var subscriptionOptions = new SubscriptionCreateOptions
            {
                Customer = customer.Id,
                Items =
                [
                    new SubscriptionItemOptions
                    {
                        Price = model.PriceId,
                    },
                ],
                PaymentBehavior = "default_incomplete",
            };
            subscriptionOptions.AddExpand("latest_invoice.payment_intent");

            var subscription = await subscriptionService.CreateAsync(subscriptionOptions);

            return new SubscriptionCreationResponse(
               subscription.Id,
               subscription.LatestInvoice.PaymentIntent.ClientSecret,
               subscription.LatestInvoiceId,
               subscription.LatestInvoice.HostedInvoiceUrl
            );
        }

        /// <summary>
        /// Cancels a subscription immediatly. The customer will not be charged again for the subscription
        /// </summary>
        public async Task<SubscriptionCancellationResponse> CancelSubscriptionAsync(SubscriptionCancellation model)
        {
            ArgumentException.ThrowIfNullOrEmpty(model.SubscriptionId);
            var subscription = await subscriptionService.CancelAsync(model.SubscriptionId);

            return new SubscriptionCancellationResponse(subscription.CanceledAt);
        }

        public async Task<List<CustomerData>> GetAllSubs()
        {
            var options = new SubscriptionSearchOptions
            {
                Query = $"status:'active'"
            };

            var subscriptions = await subscriptionService.SearchAsync(options);
            var allActiveUsers = new List<CustomerData>();

            foreach (var subscription in subscriptions)
            {
                try
                {
                    var customer = await customerService.GetAsync(subscription.CustomerId);
                    var customerModel = mapper.Map<CustomerData>(customer);
                    allActiveUsers.Add(customerModel);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error mapping customer for subscription {subscription.CustomerId}: {ex.Message}");
                }
            }

            return allActiveUsers;
        }

        public async Task<SubscriptionStatistics> GetSubsStats()
        {
            var subStats = new SubscriptionStatistics();

            // List active subscriptions
            var activeOptions = new SubscriptionListOptions()
            {
                Status = "active"
            };

            // List ended (canceled) subscriptions
            var canceledOptions = new SubscriptionListOptions()
            {
                Status = "canceled"
            };

            var activeSubscriptions = await subscriptionService.ListAsync(activeOptions);
            var canceledSubscriptions = await subscriptionService.ListAsync(canceledOptions);

            subStats.ActiveSubscriptions = activeSubscriptions.Data.Count;
            subStats.CanceledSubscriptions = canceledSubscriptions.Data.Count;

            if (subStats.CanceledSubscriptions == 0)
            {
                return null;
            }

            return subStats;
        }

        public async Task<IncomeStatistics> GetIncome30DaysBack()
        {
            var incomeStat = new IncomeStatistics();
            var balanceTransactionService = new BalanceTransactionService();

            var options = new BalanceTransactionListOptions()
            {
                Created = new DateRangeOptions
                {
                    GreaterThanOrEqual = DateTime.UtcNow.AddDays(-30),
                    LessThanOrEqual = DateTime.UtcNow
                }
            };

            try
            {
                var last30DayTransactions = await balanceTransactionService.ListAsync(options);

                incomeStat.TotalTransactions = last30DayTransactions.Count();

                foreach (var transaction in last30DayTransactions)
                {
                    incomeStat.Total += transaction.Amount;
                    incomeStat.AmountAfterTax += transaction.Amount - transaction.Fee;
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine($"{ex.Message}");
            }

            return incomeStat;
        }
    }
}
