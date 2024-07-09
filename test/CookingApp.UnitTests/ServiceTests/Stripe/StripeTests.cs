/*using CookingApp.Services.Stripe;
using NUnit.Framework;
using Moq;
using Stripe;
using Assert = NUnit.Framework.Assert;
using CookingApp.ViewModels.Stripe.Subscription;
namespace CookingApp.UnitTests.Services.Stripe
{
    internal class StripeTests
    {
        private StripeService stripeService;

        [OneTimeSetUp]
        public void Setup()
        {
            var customerServiceMoq = new Mock<CustomerService>();
            customerServiceMoq
              .Setup(x => x.CreateAsync(It.IsAny<CustomerCreateOptions>(), null, It.IsAny<CancellationToken>()))
              .ReturnsAsync(new Customer { Id = "1", Email = "test" });
            var productService = new Mock<ProductService>();
            productService
                .Setup(x => x.ListAsync(It.IsAny<ProductListOptions>(), null, It.IsAny<CancellationToken>()))
                .ReturnsAsync(new StripeList<Product>()
                {
                    Data = new List<Product>() {
                        new Product() {
                            Id = "2", Name = "test",DefaultPriceId="test",Description="description",Images=new List<string>{"test"}
                        }
                    }
                }) ;
            var subscriptionService = new Mock<SubscriptionService>();
            subscriptionService.Setup(x => x.CreateAsync(It.IsAny<SubscriptionCreateOptions>(), null,It.IsAny<CancellationToken>()))
               .ReturnsAsync(new Subscription() 
               { Id = "sUB123",
                 LatestInvoice=new Invoice() 
                   { 
                     Id="invoiceId",
                     PaymentIntent=new PaymentIntent()
                        { 
                         ClientSecret="secret"
                        },HostedInvoiceUrl="url" 
                    },
                 LatestInvoiceId="invoiceId" });
            subscriptionService.Setup(x=>x.CancelAsync(It.IsAny<string>(),null,null,It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Subscription() { Id="test",CanceledAt=DateTime.Today.AddDays(1) });
            var priceService = new Mock<PriceService>();
            priceService.Setup(x => x.GetAsync(It.IsAny<string>(), null, null, It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Price() { UnitAmount = 1 });
            var options = new CustomerCreateOptions { Email = "AFG" };

            var balanceTransactionService = new Mock<BalanceTransactionService>();


            stripeService = new StripeService(customerServiceMoq.Object, priceService.Object, productService.Object, subscriptionService.Object, balanceTransactionService.Object, );
        }
        [Test]
        public async Task GetProductsAsync_ShouldWork()
        {
            var result = await stripeService.GetProductsAsync();
            Assert.That(result, Is.Not.Null);
            Assert.That(result.First().Id, Is.EqualTo("2"));
            Assert.That(result.First().PriceId, Is.EqualTo("test"));
            Assert.That(result.First().Price, Is.EqualTo(1));
            Assert.That(result.First().Name,Is.EqualTo("test"));
            Assert.That(result.First().Description, Is.EqualTo("description"));


        }
        [Test]
        public void CreateSubscriptionAsync_ThrowsExceptions()
        {
            Assert.ThrowsAsync<ArgumentNullException>(async () => await stripeService.CreateSubscriptionAsync(new SubscriptionCreation()));
        }
        [Test]
        public async Task CancelSubscriptionAsync_ShouldWork()
        {
            var result = await stripeService.CancelSubscriptionAsync(new SubscriptionCancellation("testId"));
            Assert.That(result.CanceledAt, Is.EqualTo(DateTime.Today.AddDays(1)));
        }
    }
}
*/