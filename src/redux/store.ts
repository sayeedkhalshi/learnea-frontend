import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { api } from "./features/api.slice";
import { userSlice } from "./features/user.slice";
import { termsSlice } from "./features/terms.slice";
import { drawerSlice } from "./features/drawer.slice";
import { centralTermsSlice } from "./features/centralTerms.slice";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [termsSlice.reducerPath]: termsSlice.reducer,
    [drawerSlice.reducerPath]: drawerSlice.reducer,
    [centralTermsSlice.reducerPath]: centralTermsSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
