import { createNewApiKeyTokenApp } from "@/shared/api/appsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const generateNewApiKeyTokenAppThunk = createAsyncThunk(
    "app/generateNewAppWithApiKey",
    async (payload: { appId: string; name:string; apiKey:string; policy?: any}) => {
        const res = await createNewApiKeyTokenApp(payload);
        return { secret: res.token, refetch: true };
    }
);
