import { createToken } from "@/shared/api/tokenApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const generateTokenThunk = createAsyncThunk(
    "token/generate",
    async (payload: { appId: string; label?: string }) => {
        const res = await createToken(payload);
        return { secret: res.token, refetch: true };
    }
);
