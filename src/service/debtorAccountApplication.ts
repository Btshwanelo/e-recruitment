import { apiSlice } from '../slices/apiSlice';

export const debtorAccountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateApplication: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    UpdateDebtorApplication: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    RseumeApplication: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useCreateApplicationMutation, useUpdateDebtorApplicationMutation, useRseumeApplicationMutation } = debtorAccountSlice;
