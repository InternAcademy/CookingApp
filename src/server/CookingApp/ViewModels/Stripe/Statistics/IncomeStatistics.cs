namespace CookingApp.ViewModels.Stripe.Statistics
{
    using CookingApp.Infrastructure.Mapping;
    using global::Stripe;

    public class IncomeStatistics : IMapFrom<Balance>
    {
        public long Total { get; set; }
        public double AmountAfterTax { get; set; }
        public int TotalTransactions { get; set; }
    }
}
