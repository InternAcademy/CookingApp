
namespace CookingApp.Controllers
{
    using CookingApp.Infrastructure.Configurations.Stripe;
    using CookingApp.Services.Stripe;
    using CookingApp.ViewModels.Api;
    using CookingApp.ViewModels.Stripe.Subscription;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Stripe;
    using Product = ViewModels.Stripe.Product;

    [Route("api/stripe")]
    [ApiController]
    public class StripeController(IStripeService stripeService,
        IOptions<StripeOptions> stripeOptions ) : ControllerBase
    {
        [HttpGet("products")]
        public async Task<ApiResponse<List<Product>>> GetProductsAsync()
        {
            var products = await stripeService.GetProductsAsync();

            return new ApiResponse<List<Product>>()
            {
                Status = 200,
                Data = products.ToList()
            };

        }

        [HttpPost("subscription")]
        public async Task<ApiResponse<SubscriptionCreationResponse>> CreateSubscriptionAsync([FromBody] SubscriptionCreation model)
        {
            var customer = await stripeService.CreateSubscriptionAsync(model);

            return new ApiResponse<SubscriptionCreationResponse>()
            {
                Status = 200,
                Data = customer
            };
        }

        [HttpPost("cancel")]
        public async Task<ApiResponse<SubscriptionCancellationResponse>> CancelSubscriptionAsync([FromBody] SubscriptionCancellation model)
        {
            var subscription = await stripeService.CancelSubscriptionAsync(model);

            return new ApiResponse<SubscriptionCancellationResponse>()
            {
                Status = 200,
                Data = subscription
            };
        }
        [HttpPost("webhook")]
        [AllowAnonymous]
        public async Task<IActionResult> Webhook()
        {
           var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            
                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], stripeOptions.Value.WebhookSecret,300,false);

                
                if (stripeEvent.Type == Events.InvoicePaid)
                {
                    var invoice = stripeEvent.Data.Object as Invoice;

                    if (invoice != null)
                    {
                        var subscriptionId = invoice.SubscriptionId;
                        //Make the user premium
                        Console.WriteLine($"Invoice Paid for Subscription ID: {subscriptionId}");
                    }
                }
                else if (stripeEvent.Type == Events.CustomerCreated)
                {
                    Console.WriteLine("Customer created");
                }
                else if (stripeEvent.Type == Events.InvoiceCreated)
                {
                    Console.WriteLine("Invoice created");
                }
                else if (stripeEvent.Type == Events.CustomerSubscriptionDeleted)
                {
                    var subscription = stripeEvent.Data.Object as Subscription;

                    if (subscription != null)
                    {
                        var customerId = subscription.CustomerId;
                        Console.WriteLine($"Subscription Deleted for Customer ID: {customerId}");
                    }
                }
                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }

                return Ok();
        }

    }
}