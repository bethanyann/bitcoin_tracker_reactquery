import { configureStore } from "@reduxjs/toolkit";
// slice reducers
import appReducer from './features/appSlice';
//services 
import { bitcoinApi } from './services/app';


//configure the store with a configureStore function that takes an object
//that object takes a property that is called a reducer which also has an object
//and all of the reducers are all merged inside the reducer object in the store configuration 
export const store = configureStore({
    reducer: {
        [bitcoinApi.reducerPath] : bitcoinApi.reducer,
        app: appReducer
    },
    middleware: getDefaultMiddleWare => getDefaultMiddleWare().concat(bitcoinApi.middleware)
    
});

//Infer the 'root state' and 'appdispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;

//Inferred type" { posts: PostsState, comments: CommentsState, users: UsersState }
export type AppDispatch = typeof store.dispatch; 