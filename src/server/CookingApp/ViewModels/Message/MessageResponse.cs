﻿using CookingApp.Models.Enums;

namespace CookingApp.ViewModels.Message
{
    public class MessageResponse
    {
        public MessageType Type { get; set; } = default!;
        public string Content { get; set; } = default!;
        public string? ChatId { get; set; }
    }
}