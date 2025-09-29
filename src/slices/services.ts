import { apiSlice } from './apiSlice';

export const genericSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ExecuteRequest1: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    ExecuteRequest2: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    ExecuteRequest3: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    ExecuteRequest5: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    ExecuteRequest6: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    ExternalRequest: builder.mutation({
      query: ({ body }) => ({
        url: `/auth/external-logon`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useExternalRequestMutation,
  useExecuteRequest1Mutation,
  useExecuteRequest2Mutation,
  useExecuteRequest3Mutation,
  useExecuteRequest5Mutation,
  useExecuteRequest6Mutation,
} = genericSlice;
