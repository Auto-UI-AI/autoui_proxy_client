import type { RootState } from "@app/providers/store";

export const selectTokenState = (s: RootState) => s.token;
export const selectAppId = (s: RootState) => s.token.appId;
