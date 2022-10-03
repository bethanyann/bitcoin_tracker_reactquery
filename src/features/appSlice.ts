import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//types
import { Currencies } from '../bitcoinTypes';

type AppState = {
    currency: Currencies;
}

const initialState: AppState = {
    currency: Currencies.USD
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        //reducer here to change the currency
        changeCurrency: (state, action: PayloadAction<Currencies>) => {
            //when we get a new currency set, set the currency from the action payload 
            //yes we are directly mutation the state here, but it's ok to do it like this
            //because redux toolkit is set up to allow you to do this 
            state.currency = action.payload;
        }
    }
});

export const { changeCurrency } = appSlice.actions;

export default appSlice.reducer;