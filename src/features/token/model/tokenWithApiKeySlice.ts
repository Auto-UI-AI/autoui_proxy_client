import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TokenState, TokenWithApiKeyState } from "./type";
import { fetchTokensThunk } from "./services/fetchTokensThunk";
import { generateTokenThunk } from "./services/generateTokenThunk";
import { revokeTokenThunk } from "./services/revokeTokenThunk";
import { set } from "zod";
import { generateNewApiKeyTokenAppThunk } from "./services/generateNewApiKeyTokenAppThunk";

const initialState: TokenWithApiKeyState = {
    appId: "tasks-demo",
    apiKey: '',
    items: [],
    loading: false,
};

const slice = createSlice({
    name: "tokenWithApiKey",
    initialState,
    reducers: {
        setAppId(state, action: PayloadAction<string>) {
            state.appId = action.payload;
        },
        setApiKey(state, action: PayloadAction<string>) {
            state.apiKey = action.payload;
        },
        clearGeneratedSecret(state) {
            state.generatedSecret = undefined;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTokensThunk.pending, (s) => {
                s.loading = true;
                s.error = undefined;
            })
            .addCase(fetchTokensThunk.fulfilled, (s, a) => {
                s.loading = false;
                s.items = a.payload;
            })
            .addCase(fetchTokensThunk.rejected, (s, a) => {
                s.loading = false;
                s.error = a.error.message || "Failed to load tokens";
            })

            .addCase(generateTokenThunk.pending, (s) => {
                s.loading = true;
                s.error = undefined;
                s.generatedSecret = undefined;
            })
            .addCase(generateTokenThunk.fulfilled, (s, a) => {
                s.loading = false;
                s.generatedSecret = a.payload.secret;
                if (a.payload.refetch) {
                    // items оновляться fetchTokensThunk викликом з UI
                }
            })
            .addCase(generateTokenThunk.rejected, (s, a) => {
                s.loading = false;
                s.error = a.error.message || "Failed to generate token";
            })

            .addCase(revokeTokenThunk.pending, (s) => {
                s.loading = true;
                s.error = undefined;
            })
            .addCase(revokeTokenThunk.fulfilled, (s, a) => {
                s.loading = false;
                s.items = s.items.filter((t) => t.id !== a.payload.tokenId);
            })
            .addCase(revokeTokenThunk.rejected, (s, a) => {
                s.loading = false;
                s.error = a.error.message || "Failed to revoke token";
            })
            .addCase(generateNewApiKeyTokenAppThunk.pending, (s) => {
            s.loading = true;
            s.error = undefined;
            s.generatedSecret = undefined;
            })
            .addCase(generateNewApiKeyTokenAppThunk.fulfilled, (s, a) => {
            s.loading = false;
            s.generatedSecret = a.payload.secret;
            // you might also want to set s.appId = ??? if your API returns it
            // if (a.payload.refetch) you can trigger a fetchTokensThunk from the UI
            })
            .addCase(generateNewApiKeyTokenAppThunk.rejected, (s, a) => {
            s.loading = false;
            s.error = a.error.message || "Failed to create app + token";
            });
            },
});

export const tokenWithApiKeyReducer = slice.reducer;
export const tokenWithApiKeyActions = slice.actions;
