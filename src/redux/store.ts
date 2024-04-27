import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/authSlice";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const reducers = combineReducers({
    user: userReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persisitedReducer = persistReducer(persistConfig, reducers)

const rootReducer: Reducer = (state, action) => {
    if (action.type === "RESET") {
        storage.removeItem("persist:root");
        state = {}
    }
    return persisitedReducer(state, action)
}

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)
