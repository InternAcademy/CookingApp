
namespace CookingApp.ViewModels.Chat
{
    using CookingApp.Infrastructure.Mapping;
    using AutoMapper;

    public class ChatDataResponse : IMapFrom<Models.Chat>
    {
        public string ChatId { get; set; } = default!;
        public string Title { get; set; } = default!;
        public DateTime Time { get; set; } = default!;

        public void Mapping(Profile mapper)
        {
            mapper.CreateMap<Models.Chat, ChatDataResponse>()
                .ForMember(des => des.ChatId, src => src.MapFrom(x => x.Id))
                .ForMember(des => des.Time, src => src.MapFrom(x => x.CreatedDateTime));
        }
    }
}
