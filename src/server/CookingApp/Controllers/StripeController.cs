﻿using CookingApp.Infrastructure.Configurations.Stripe;
using CookingApp.Services.Stripe;
using CookingApp.ViewModels.Api;
using CookingApp.ViewModels.Stripe;
using CookingApp.ViewModels.Stripe.Customer;
using CookingApp.ViewModels.Stripe.Subscription;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using System.Net;
using Product = CookingApp.ViewModels.Stripe.Product;

namespace CookingApp.Controllers
{

    [Route("api/stripe")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly IStripeService stripeService;
        private readonly StripeOptions stripeOptions;
        public StripeController(IStripeService _stripeService,IOptions<StripeOptions> options)
        {
            stripeService = _stripeService;
            stripeOptions = options.Value;
        }
        [HttpGet("products")]
        public async Task<ApiResponse<List<Product>>> GetProductsAsync()
        {
            ApiResponse<List<Product>> result =
                    new ApiResponse<List<Product>>();
            try
            {
                var products = await stripeService.GetProductsAsync();
                result.Status = 200;
                result.Data = products.ToList();
                return result;
            }
            catch (Exception ex)
            {
                result.Status = 500;
                result.Errors.Add(ex.Message);
            }
            return result;

        }

        [HttpPost("customer")]
        public async Task<ApiResponse<CustomerCreationResponse>> CreateCustomerAsync ([FromBody] CustomerCreation model)
        {
            ApiResponse<CustomerCreationResponse> result =
                    new ApiResponse<CustomerCreationResponse>();
            try
            {
                var customer = await stripeService.CreateCustomerAsync(model.Email);
                result.Status = 200;
                result.Data = customer;
                return result;
            }
            catch (ArgumentException ex)
            {
                result.Status = 400;
                result.Errors.Add(ex.Message);
            }
            catch(StripeException ex)
            {
                result.Status = 400;
                result.Errors.Add(ex.Message);
            }
            catch (Exception ex)
            {
                result.Status = 500;
                result.Errors.Add(ex.Message);
            }
            return result;
        }

        [HttpPost("subscription")]
        public async Task<ApiResponse<SubscriptionCreationResponse>> CreateSubscriptionAsync([FromBody] SubscriptionCreation model)
        {
            ApiResponse<SubscriptionCreationResponse> result =
                  new ApiResponse<SubscriptionCreationResponse>();
            try
            {
                var subscription = await stripeService.CreateSubscriptionAsync(model);
                result.Status = 200;
                result.Data = subscription;
                return result;
            }
            catch (ArgumentNullException ex)
            {
                result.Status = 400;
                result.Errors.Add(ex.Message);
            }
            catch (StripeException ex)
            {
                result.Status = 400;
                result.Errors.Add(ex.Message);
            }
            catch (Exception ex)
            {
                result.Status = 500;
                result.Errors.Add(ex.Message);
            }
            return result;
        }

        [HttpPost("cancel")]
        public async Task<ActionResult> CancelSubscriptionAsync([FromBody] SubscriptionCancellation model)
        {
            return Ok(await stripeService.CancelSubscriptionAsync(model));
        }


        [AllowAnonymous]
        [HttpPost("webhook")]
        public async Task<IActionResult> Webhook()
        {
            Console.Write("Webhook entered");

            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            Event stripeEvent;
            try
            {
                stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                   stripeOptions.WebhookSecret
                );
                Console.WriteLine($"Webhook notification with type: {stripeEvent.Type} found for {stripeEvent.Id}");
            }
            catch (Exception e)
            {
                Console.WriteLine($"Something failed {e}");
                return BadRequest();
            }

            if (stripeEvent.Type == "invoice.payment_succeeded")
            {
                Console.WriteLine("PAYMENT_SUCCEDED");

                var invoice = stripeEvent.Data.Object as Invoice;

                if (invoice.BillingReason == "subscription_create")
                {
                    // The subscription automatically activates after successful payment
                    // Set the payment method used to pay the first invoice
                    // as the default payment method for that subscription

                    // Retrieve the payment intent used to pay the subscription
                    var service = new PaymentIntentService();
                    var paymentIntent = service.Get(invoice.PaymentIntentId);

                    // Set the default payment method
                    var options = new SubscriptionUpdateOptions
                    {
                        DefaultPaymentMethod = paymentIntent.PaymentMethodId,
                    };
                    var subscriptionService = new SubscriptionService();
                    subscriptionService.Update(invoice.SubscriptionId, options);

                    Console.WriteLine($"Default payment method set for subscription: {paymentIntent.PaymentMethodId}");
                }
                Console.WriteLine($"Payment succeeded for invoice: {stripeEvent.Id}");
            }

            if (stripeEvent.Type == "invoice.paid")
            {
                Console.WriteLine("PAYED");
                // Used to provision services after the trial has ended.
                // The status of the invoice will show up as paid. Store the status in your
                // database to reference when a user accesses your service to avoid hitting rate
                // limits.
            }

            if (stripeEvent.Type == "invoice.payment_failed")
            {
                Console.WriteLine("FAILED");
                // If the payment fails or the customer does not have a valid payment method,
                // an invoice.payment_failed event is sent, the subscription becomes past_due.
                // Use this webhook to notify your user that their payment has
                // failed and to retrieve new card details.
            }

            if (stripeEvent.Type == "invoice.finalized")
            {
                Console.WriteLine("INVOICE FINALIZED");

                // If you want to manually send out invoices to your customers
                // or store them locally to reference to avoid hitting Stripe rate limits.
            }

            if (stripeEvent.Type == "customer.subscription.deleted")
            {
                // handle subscription cancelled automatically based
                // upon your subscription settings. Or if the user cancels it.
            }

            if (stripeEvent.Type == "customer.subscription.trial_will_end")
            {
                // Send notification to your user that the trial will end
            }

            return Ok();
        }
    }
}
