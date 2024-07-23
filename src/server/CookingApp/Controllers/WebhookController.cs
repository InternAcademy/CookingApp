using CookingApp.Common.Helpers.Profiles;
using CookingApp.Infrastructure.Configurations.Stripe;
using CookingApp.Infrastructure.Interfaces;
using CookingApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;

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
                        user.Role = CreateRole.Premium();
                        Console.WriteLine($"User with stripe id: {user.StripeId} now has a role: {user.Role.Type}");
                        await userRepo.UpdateAsync(user);
                    }
                }
                else if (stripeEvent.Type == Events.CustomerSubscriptionDeleted)
                {
                    var subscription = stripeEvent.Data.Object as Subscription;

                    if (subscription != null)
                    {
                       var user = await userRepo.GetFirstOrDefaultAsync(user=>user.StripeId == subscription.CustomerId);
                        user.Role = CreateRole.Free();
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
