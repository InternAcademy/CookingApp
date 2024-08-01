namespace CookingApp.Services.CostCalculation.Azure
{
    using System.Configuration;
#pragma warning disable 1591
    public static class Constants
    {
        public const string SearchTerm = "Items";
        const string and = "and";
        const string eq = "eq";
        const string skuId = "skuId";
        const string meterId = "meterId";
        const string armRegionName = "armRegionName";
        const string eastus = "eastus";
        const string westus = "westus";

        const string dataSkuQuery = $"{and} {skuId} {eq} 'DZH318Z0C120/004T'";
        const string dataStoredSkuQuery = $"{and} {skuId} {eq} 'DZH318Z0BPJH/00CQ'";
        const string iterativeDataSkuQuery = $"{and} {skuId} {eq} 'DZH318Z0BJRM/003V'";

        const string eastRegionQuery = $"{and} {armRegionName} {eq} 'eastus'";
        const string westRegionQuery = $"{and} {armRegionName} {eq} 'westus'";

        const string azureDbQuery = $"{meterId} {eq} '65d4ded2-41ae-43a8-bb68-3c200e1ba864' {eastRegionQuery}";
        const string azureDbTransactionalStorageQuery = $"{meterId} {eq} '56f07b6a-c7d9-490f-a196-a7ee08e28712' {dataStoredSkuQuery} {eastRegionQuery}";
        const string azureAppServiceQuery = $"{skuId} {eq} 'DZH318Z0BXW9/0015'";
        const string microsoftEntraIdQuery = $"{skuId} {eq} 'DZH318Z0BQFM/000V' {westRegionQuery}";
        const string hotWriteOperationsQuery = $"{meterId} {eq} '60dc3f8d-d252-441d-979b-438577131157' {dataSkuQuery} {eastRegionQuery}";
        const string hotReadOperationsQuery = $"{meterId} {eq} '8c0c8101-8307-4a2b-9b2f-3943406c1df3' {dataSkuQuery} {eastRegionQuery}";
        const string hotIterativeReadOperationsQuery = $"{meterId} {eq} '5bfb25fe-30a1-4204-9216-3396a00e190a' {iterativeDataSkuQuery} {eastRegionQuery}";
        const string hotIterativeWriteOperationsQuery = $"{meterId} {eq} '1466701b-8cdf-45fc-ad85-af5d2b7fb52f' {iterativeDataSkuQuery} {eastRegionQuery}";
        const string HotLRSIndexQuery = $"{meterId} {eq} '8451743b-a468-43c6-9ee8-f0e77e3cfa1e' {dataSkuQuery} {eastRegionQuery}";
        const string HotOtherQuery = $"{meterId} {eq} 'be2ec095-2493-4d58-8ce2-b2574cee1619' {dataSkuQuery} {eastRegionQuery}";

        public const string CosmosDb = "Azure Cosmos DB";
        public const string AzureAppService = "Azure App Service Basic Plan - Linux";
        public const string EntraId = "Microsoft Entra Domain Services";
        public const string BlockBlob = "General Block Blob v2 Hierarchical Namespace";
        public const string AzureDataLake = "Azure Data Lake Storage Gen2 Hierarchical Namespace";

        public class Meter
        {
            public const string ReadUnits = "100 RU/s";
            public const string DataStored = "Data Stored";
            public const string HotWrite = "Hot Write Operations";
            public const string HotRead= "Hot Read Operations";
            public const string HotIterativeRead= "Hot Iterative Read Operations";
            public const string HotIterativeWrite = "Hot Iterative Write Operations";
            public const string Index = "Hot LRS Index";
            public const string Other = "Hot Other Operations";
        }
        public static string[] Queries { get; set; } =
                [azureDbQuery, azureDbTransactionalStorageQuery,
                azureAppServiceQuery, microsoftEntraIdQuery,
                hotWriteOperationsQuery, hotReadOperationsQuery,
                hotIterativeReadOperationsQuery, hotIterativeWriteOperationsQuery,
                HotLRSIndexQuery, HotOtherQuery];
    }
}
