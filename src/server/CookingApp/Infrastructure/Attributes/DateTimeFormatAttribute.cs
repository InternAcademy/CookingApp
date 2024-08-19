using System;

[AttributeUsage(AttributeTargets.Property)]
sealed class DateTimeFormatAttribute : Attribute
{
    public string Format { get; }

    public DateTimeFormatAttribute(string format)
    {
        Format = format;
    }
}
