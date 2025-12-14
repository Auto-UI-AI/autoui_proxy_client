import { fetchTokens } from "@/shared/api/tokenApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTokensThunk = createAsyncThunk("token/fetchList", async (appId: string) => {
    return await fetchTokens(appId);
});
