import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//types
import type { BitcoinData } from '../bitcoinTypes';

//this is called RTK Query and it can be used instead of React Query 
const BASE_URL = 'https://blockchain.info';

export const bitcoinApi = createApi({
    reducerPath: 'bitcoinApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: builder => ({
      getBitcoinData: builder.query<BitcoinData, undefined>({
        query: () => '/ticker'
      })
    })
});
  
//this hook gets auto created and it has to be named a very specfic way - if another word gets added 
//it will get a red squiggle underneath 
//has to start with 'use' and then has to be the exact name of the getBitcoinData endpoint followed
//by either 'query' or 'mutation'
export const { useGetBitcoinDataQuery } = bitcoinApi;