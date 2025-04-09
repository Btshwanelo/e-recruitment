import { apiSlice } from '../slices/apiSlice';

export const externalLogonSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateExternalLogon: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useCreateExternalLogonMutation } = externalLogonSlice;
