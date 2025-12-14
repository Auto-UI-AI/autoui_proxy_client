import { revokeToken } from "@/shared/api/tokenApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const revokeTokenThunk = createAsyncThunk("token/revoke", async (tokenId: string) => {
    await revokeToken(tokenId);
    return { tokenId };
});
