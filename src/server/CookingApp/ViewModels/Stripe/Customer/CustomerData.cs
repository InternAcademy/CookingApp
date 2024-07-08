namespace CookingApp.ViewModels.Stripe.Customer
{
    using CookingApp.Infrastructure.Mapping;
    using System.Collections.Generic;
    using global::Stripe;

    public class CustomerData : IMapFrom<Customer>
    {
        public string Id { get; set; }
        public DateTime Created { get; set; }
        public string? Description { get; set; }
        public string? Email { get; set; }
        public Dictionary<string, string> Metadata { get; set; }
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public List<SubscriptionState> Subscriptions { get; set; }
    }

    public class SubscriptionState
    {
        public string Id { get; set; }
        public string PriceId { get; set; }
        public string State { get; set; }
        public DateTime CancelAt { get; set; }
    }
}