import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TokenState } from "./type";
import { fetchTokensThunk } from "./services/fetchTokensThunk";
import { generateTokenThunk } from "./services/generateTokenThunk";
import { revokeTokenThunk } from "./services/revokeTokenThunk";

const initialState: TokenState = {
    appId: "tasks-demo",
    items: [],
    loading: false,
};

const slice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setAppId(state, action: PayloadAction<string>) {
            state.appId = action.payload;
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
            });
    },
});

export const tokenReducer = slice.reducer;
export const tokenActions = slice.actions;
