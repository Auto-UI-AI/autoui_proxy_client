import type { TokenItem } from "@/shared/token/types";

export type TokenState = {
    appId: string
    items: TokenItem[];
    loading: boolean;
    error?: string;

    generatedSecret?: string;
};

export type TokenWithApiKeyState = {
    appId: string;
    apiKey?: string;
    items: TokenItem[];
    loading: boolean;
    error?: string;

    generatedSecret?: string;
};