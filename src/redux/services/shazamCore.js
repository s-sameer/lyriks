// Main file where we will make the api calls
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers)=>{
            headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_API_KEY)
            return headers;
        }
    }),
    // Building all endpoints of the api
    endpoints: (builder) => ({
        getTopCharts: builder.query({query: ()=>'/charts/world'}),
        getSongsByGenre: builder.query({query: (genre)=>`/charts/genre-world?genre_code=${genre}`}),
        getSongDetails: builder.query({query: ({songid})=>`/tracks/details?track_id=${songid}`}),
        getSongRelated: builder.query({query: ({songid})=>`/tracks/related?track_id=${songid}`}),
        getArtistDetails: builder.query({query: (artistId)=>`/artists/details?artist_id=${artistId}`}),
        getSongsByCountry: builder.query({query: (countryCode)=>`/charts/country?country_code=${countryCode}`}),
        getSongsBySearch: builder.query({query: (searchTerm)=>`/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`}),
    })
})
// RTK query automatically creates hooks for us that we can use to get the data from the APIs
export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery, useGetSongsByCountryQuery, useGetSongsByGenreQuery, useGetSongsBySearchQuery } = shazamCoreApi