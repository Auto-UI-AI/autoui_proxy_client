import { api } from "@/shared/api/axios";
import type { TokenItem, TokenListResponse, TokenCreateResponse } from "../token/types";

export async function fetchTokens(appId: string) {
    const { data } = await api.get<TokenListResponse>(`/ui/tokens`, { params: { appId } });
    return data.items;
}

export async function createToken(payload: { appId: string; label?: string }) {
    const { data } = await api.post<TokenCreateResponse>(`/ui/tokens`, payload);
    return data;
}

export async function revokeToken(tokenId: string) {
    await api.delete(`/ui/tokens/${tokenId}`);
}
