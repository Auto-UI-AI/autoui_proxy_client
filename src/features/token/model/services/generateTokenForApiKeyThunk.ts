import { createTokenWithApikey } from "@/shared/api/tokenApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const generateTokenForApiKeyThunk = createAsyncThunk(
    "token/generate",
    async (payload: { appId: string; apiKey?:string; label?: string}) => {
        const res = await createTokenWithApikey(payload);
        return { secret: res.token, refetch: true };
    }
);
