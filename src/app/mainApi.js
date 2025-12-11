import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base URL for development
export const base = 'http://10.179.241.216:5000';

// Main API setup
export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.179.241.216:5000/api'}),
  endpoints: (builder) => ({}),
});
