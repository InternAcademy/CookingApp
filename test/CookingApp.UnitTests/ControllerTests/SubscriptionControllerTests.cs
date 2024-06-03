using CookingApp.Controllers;
using CookingApp.Services.Stripe;
using CookingApp.ViewModels.Stripe.Customer;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace CookingApp.UnitTests.ControllerTests
{
    internal class SubscriptionControllerTests
    {
        private Mock<IStripeService> stripeService;
        private SubscriptionController subsController;

        [SetUp]
        public void Setup()
        {
            stripeService = new Mock<IStripeService>();
            stripeService.Setup(service => service.CreateCustomerAsync(It.IsAny<string>()))
                              .ReturnsAsync(new CustomerCreationResponse("cust_12345", "test@example.com"));
            subsController = new SubscriptionController(stripeService.Object);
        }
        [Test]
        public async Task ShouldReturnSubscription()
        {
            var result = await subsController.CreateCustomerAsync(new CustomerCreation() { Email="TEST"});

            var okResult = result as OkObjectResult;
            Assert.That(okResult,Is.Not.Null);
            Assert.That(okResult?.StatusCode,Is.EqualTo(200));
            Assert.That(okResult?.Value, Is.Not.Null); 


        }
    }
}
