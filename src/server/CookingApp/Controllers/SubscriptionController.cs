using CookingApp.Services.Stripe;
using CookingApp.ViewModels.Stripe.Customer;
using Microsoft.AspNetCore.Mvc;

namespace CookingApp.Controllers
{
    //The endpoints are still not working without authorizationScheme
    [Route("api/subscription")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly IStripeService stripeService;

        public SubscriptionController(IStripeService _stripeService)
        {
            stripeService = _stripeService;
        }

        [HttpPost("create-customer")]
        public async Task<ActionResult> CreateCustomerAsync ([FromBody] CustomerCreation model)
        {
            return Ok(await stripeService.CreateCustomerAsync(model.Email));
        }
    }
}
