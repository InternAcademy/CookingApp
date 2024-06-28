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
        SubscriptionService subscriptionService) : IStripeService
    {
        /// <summary>
        /// Creates a customer object in Stripe.
        /// It is used to create recurring charges and track payments that belong to the same customer.
        /// </summary>
        public async Task<CustomerCreationResponse> CreateCustomerAsync(string email)
        {
            ArgumentException.ThrowIfNullOrEmpty(email);
            var options = new CustomerCreateOptions
            {
                Email = email
            };
            Customer customer = await customerService.CreateAsync(options);

            return (new CustomerCreationResponse(
                          customer.Id,
                          customer.Email)
                  );
        }

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
                    product.Description));
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
                string.IsNullOrEmpty(model.CustomerId) ||
                string.IsNullOrEmpty(model.PriceId))
            {
                throw new ArgumentException(NullOrEmptyInputValues);
            }
            var subscriptionOptions = new SubscriptionCreateOptions
            {
                Customer = model.CustomerId,
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
            try
            {
                Subscription subscription = await subscriptionService.CreateAsync(subscriptionOptions);

                return new SubscriptionCreationResponse(
                   subscription.Id,
                   subscription.LatestInvoice.PaymentIntent.ClientSecret,
                   subscription.LatestInvoiceId,
                   subscription.LatestInvoice.HostedInvoiceUrl
                );
            }
            catch (StripeException e)
            {
                throw new Exception(string.Format(SubscriptionCreationFail, e));
            }
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
