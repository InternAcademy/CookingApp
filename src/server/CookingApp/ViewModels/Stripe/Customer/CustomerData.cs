namespace CookingApp.ViewModels.Stripe.Customer
{
    using CookingApp.Infrastructure.Mapping;
    using System.Collections.Generic;
    using global::Stripe;

    public class CustomerData : IMapFrom<Customer>
    {
        public string Id { get; set; } = string.Empty;
        public DateTime Created { get; set; }
        public string? Description { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public Dictionary<string, string> Metadata { get; set; } = new Dictionary<string, string>();
        public string? Name { get; set; } = string.Empty;
        public string? Phone { get; set; } = string.Empty;
        public List<SubscriptionState> Subscriptions { get; set; } = new List<SubscriptionState>();
    }

    public class SubscriptionState : IMapFrom<Subscription>
    {
        public string Id { get; set; } = string.Empty;
        public string PriceId { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public DateTime? CancelAt { get; set; }
        public DateTime Created { get; set; }
        public DateTime CurrentPeriodEnd { get; set; }
    }
}