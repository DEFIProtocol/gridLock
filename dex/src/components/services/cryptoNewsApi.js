import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': {}
    'x-rapidapi-key': {}
};
const createRequest = (url) => ({url, headers: cryptoNewsHeaders});
const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

export const cryptoNewsApi = createApi({
    ReducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: () => createRequest(
                '/news/search?q=cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&coun=12'),
        }),
    })
})


export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;

