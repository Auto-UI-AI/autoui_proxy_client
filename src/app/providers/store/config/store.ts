import { tokenReducer } from "@/features/token/model/tokenSlice";
import { tokenWithApiKeyReducer } from "@/features/token/model/tokenWithApiKeySlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        tokenWithApiKey: tokenWithApiKeyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
