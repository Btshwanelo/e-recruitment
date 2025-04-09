import { apiSlice } from '../slices/apiSlice';

export const debtorAccountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateUserProfileReq: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useCreateUserProfileReqMutation } = debtorAccountSlice;
