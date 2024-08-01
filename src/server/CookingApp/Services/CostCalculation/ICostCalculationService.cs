namespace CookingApp.Services.CostCalculation
{
#pragma warning disable 1591
    /// <summary>
    /// Provides access to external APIs and calculates predicted expenses
    /// </summary>
    public interface ICostCalculationService
    {
        /// <summary>
        /// Sends a series of queries to the Azure Retail Prices API to receive the prices for the utilized Azure services.
        /// </summary>
        /// <returns>(decimal) The charge per month for current Auzre services.</returns>
        Task<decimal> AzureServices();

        /// <summary>
        /// Calculates the average amount of costs for using OpenAI API services as per current price of requests/responses.
        /// </summary>
        /// <param name="userCount">The count of users.</param>
        /// <param name="textRequestsPerMonth">The amount of requests per month per user.</param>
        /// <param name="imagesCount">The amount of image requests per month.</param>
        /// <returns>(decimal) The estmation of ChatGPT 4 and DALL-E 3 costs.</returns>
        decimal OpenAiApiServices(int userCount, int textRequestsPerMonth, int imagesCount);

        /// <summary>
        /// Calculates the fees for Stripe API services given the price for a single subscription.
        /// </summary>
        /// <param name="subPrice">The subscription price.</param>
        /// <returns>(decimal) The estimation for the costs of Stripe API services.</returns>
        Task<decimal> StripeApiServices(decimal subPrice);

        /// <summary>
        /// Calculates the costs of prices by time span "montly"/"yearly". 
        /// </summary>
        /// <param name="span">Either "monthly" or "yearly"</param>
        /// <returns>(decimal) The calculation of all fixed fees.</returns>
        decimal FixedPrices(string span);
    }
}
