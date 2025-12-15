import { api } from "@/shared/api/axios";
import { newApiKeyAppWithTokenResponse } from "../token/appTypes";
export async function createNewApiKeyTokenApp(payload: { appId: string; name: string; apiKey: string; policy?: any }) {
    const { data } = await api.post<newApiKeyAppWithTokenResponse>(`/ui/appsWithApiKey`, payload);
    return data;
}