﻿namespace CookingApp.Infrastructure.Mapping
{
    using AutoMapper;

    public interface IMapFrom<T>
    {
        void Mapping(Profile mapper) => mapper.CreateMap(typeof(T), GetType());
    }
}
