export type TokenItem = {
    id: string;
    label?: string;
    createdAt: string;
    lastUsedAt?: string | null;
};

export type TokenListResponse = { items: TokenItem[] };

export type TokenCreateResponse = {
    token: string;
    tokenId?: string;
};
