namespace CookingApp.Infrastructure.Configurations.Logging
{
    public record LoggingConfiguration
    {
        public string? SeqServerUrl { get; private set; }
        public bool UseConsoleSink { get; private set; } = true;

        /// <summary>
        /// Sets the Seq Url
        /// </summary>
        /// <param name="url">Url</param>
        /// <returns><see cref="LoggingConfiguration"/></returns>
        public LoggingConfiguration WithSeqSink(string url)
        {
            SeqServerUrl = url;
            return this;
        }

        /// <summary>
        /// Sets if a console sink should be used
        /// </summary>
        /// <param name="value">True/False</param>
        /// <returns><see cref="LoggingConfiguration"/></returns>
        public LoggingConfiguration WithConsoleSink(bool value)
        {
            UseConsoleSink = value;
            return this;
        }
    }
}
