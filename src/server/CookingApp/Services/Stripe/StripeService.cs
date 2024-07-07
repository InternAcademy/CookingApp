namespace CookingApp.Services.Stripe
{
    using CookingApp.ViewModels.Stripe.Customer;
    using CookingApp.ViewModels.Stripe.Subscription;
    using global::Stripe;
    using static CookingApp.Common.ExceptionMessages;
    using Product = ViewModels.Stripe.Product;

    public class StripeService(CustomerService customerService,
        PriceService priceService,
        ProductService productService,
        SubscriptionService subscriptionService,
        InvoiceService invoiceService) : IStripeService
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
                throw new ArgumentException(Stripe.NullOrEmptyInputValues);
            }

            var customerListOptions = new CustomerListOptions
            {
                Email=model.Email,
                //TestClock="clock_1PZsjDGDavrFdJvjIW5JFkXc"
            };

            var customers = await customerService.ListAsync(customerListOptions);
            var customer = customers.Data.FirstOrDefault();
            
            if(customer is not null)
            {
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
                    var incompleteSubscription = subscriptions.FirstOrDefault(sub=>sub.Status=="incomplete");
                    if(incompleteSubscription is not null)              
                    {   
                        var invoiceListOptions = new InvoiceListOptions
                        {
                            Status = "open",
                            Subscription=incompleteSubscription.Id
                        };
                        var invoices=await invoiceService.ListAsync(invoiceListOptions);
                        var invoice=invoices.First();
                        return new SubscriptionCreationResponse(
                            incompleteSubscription.Id,
                            invoice.Id,
                            invoice.HostedInvoiceUrl
                        );
                    }
                }
            }
            
            if(customer is null)
            {
                var options = new CustomerCreateOptions
                {
                    Email = model.Email
                };
                customer = await customerService.CreateAsync(options);
            }
           
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
    }
}
