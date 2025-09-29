import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import config from '@/config';

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('api-key', config.apiKey);
    return headers;
  },
});

export const baseQueryWithTransform = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  // Handle HTTP errors
  if (result.error) {
    return { error: result.error };
  }

  const data = result.data;

  // Handle API-level errors (when isSuccess is false)
  if (data?.isSuccess === false) {
    return {
      error: {
        status: 'CUSTOM_ERROR',
        data: data.clientMessage || 'An unknown error occurred',
      },
    };
  }

  const newData = data?.outputParameters || data;

  // Return successful data from outputParameters
  return { data: { ...newData, clientMessage: data?.clientMessage, results: data?.results, gotoUrl: data?.gotoUrl } };
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithTransform,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
