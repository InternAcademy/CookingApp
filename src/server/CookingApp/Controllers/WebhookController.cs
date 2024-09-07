using CookingApp.Common.Helpers.Profiles;
using CookingApp.Infrastructure.Configurations.Stripe;
using CookingApp.Infrastructure.Interfaces;
using CookingApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;

namespace CookingApp.Controllers
{
    [AllowAnonymous]
    [ApiController]
    public class WebhookController(IOptions<StripeOptions> stripeOptions,
    IRepository<UserProfile> userRepo) : ControllerBase
    {
[       HttpPost("webhook")]
        public async Task<IActionResult> Webhook()
        {
           var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            
                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], stripeOptions.Value.WebhookSecret,300,false);
                    
                if (stripeEvent.Type == Events.InvoicePaymentSucceeded)
                {
                    var invoice = stripeEvent.Data.Object as Invoice;
                   
                    if (invoice != null)
                    {
                        var user = await userRepo.GetFirstOrDefaultAsync(user=>user.StripeId == invoice.CustomerId);
                        user.Role = CreateRole.Premium(user.Role.Limitations, 50, 30);
                        Console.WriteLine($"User with stripe id: {user.StripeId} now has a role: {user.Role.Type}, {user.Role.Limitations.RecipeGeneration} recipes and" +
                            $"{user.Role.Limitations.ChatGeneration} messages ");
                        await userRepo.UpdateAsync(user);
                    }
                }

                else if(stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Session;

                    if (session != null && session.Mode == "payment")
                    {
                        var service = new SessionService();
                        var item = service.ListLineItems(session.Id).First();

                            var productId = item.Price.ProductId;
                            var productService = new ProductService();
                            var product = productService.Get(productId);

                            if (product.Metadata.TryGetValue("Messages", out string messagesValue))
                            {
                                Console.WriteLine($"Product metadata 'messages': {messagesValue}");
                            }
                            if (product.Metadata.TryGetValue("Recipes", out string recipesValue))
                            {
                                Console.WriteLine($"Product metadata 'recipes': {recipesValue}");
                            }

                        var user = await userRepo.GetFirstOrDefaultAsync(user => user.StripeId == session.CustomerId);

                        user.Role.Limitations.RecipeGeneration += int.Parse(recipesValue);
                        user.Role.Limitations.ChatGeneration += int.Parse(messagesValue);

                        Console.WriteLine($"User with stripe id: {user.StripeId}" +
                                $" now has {user.Role.Limitations.ChatGeneration} messages and {user.Role.Limitations.RecipeGeneration} recipes ");
                        await userRepo.UpdateAsync(user);
                }
                }
            
                else if (stripeEvent.Type == Events.CustomerSubscriptionDeleted)
                {
                    var subscription = stripeEvent.Data.Object as Subscription;

                    if (subscription != null)
                    {
                        var user = await userRepo.GetFirstOrDefaultAsync(user=>user.StripeId == subscription.CustomerId);
                        user.Role = CreateRole.Basic(user.Role.Limitations, 0, 0);
                        Console.WriteLine($"User with stripe id: {user.StripeId} now has a role: {user.Role.Type}");
                        await userRepo.UpdateAsync(user);
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
