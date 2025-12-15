import { useEffect, useMemo, useState } from "react";
import { Button, Input } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/providers/store";
import { tokenWithApiKeyActions } from "@/features/token/model/tokenWithApiKeySlice";
import { CopyableSecret } from "@/shared/ui/CopyableSecret";
import {selectTokenWithApiKeyState } from "../model/selectors";
import { fetchTokensThunk } from "../model/services/fetchTokensThunk";
import { generateTokenForApiKeyThunk } from "../model/services/generateTokenForApiKeyThunk";

export function GenerateTokenWithApiKeyForm() {
    const dispatch = useDispatch<AppDispatch>();
    const { appId, apiKey, loading, generatedSecret, error } = useSelector(selectTokenWithApiKeyState);

    const [label, setLabel] = useState<string>("");

    const canSubmit = useMemo(() => appId.trim().length > 0 && !loading, [appId, loading]);

    useEffect(() => {
        dispatch(fetchTokensThunk(appId));
    }, [dispatch, appId]);

    return (
        <div className="space-y-4">
            <Input
                label="App ID"
                value={appId}
                onChange={(e) => dispatch(tokenWithApiKeyActions.setAppId(e.target.value))}
                placeholder="tasks-demo"
            />
            <Input
                label="Api key"
                value={apiKey}
                onChange={(e) => dispatch(tokenWithApiKeyActions.setApiKey(e.target.value))}
                placeholder="sk-xxxxxxxxxxxxxxxxxxxx"
            />  
            <Input
                label="Label (optional)"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="My laptop"
            />
            
            <div className="flex gap-3">
                <Button
                    color="primary"
                    isLoading={loading}
                    isDisabled={!canSubmit}
                    onPress={async () => {
                        dispatch(tokenWithApiKeyActions.clearGeneratedSecret());
                        await dispatch(generateTokenForApiKeyThunk({ appId, apiKey, label: label || undefined }));
                      
                        dispatch(fetchTokensThunk(appId));
                        setLabel("");
                    }}
                >
                    Generate token
                </Button>

                <Button
                    variant="flat"
                    isDisabled={loading}
                    onPress={() => dispatch(fetchTokensThunk(appId))}
                >
                    Refresh list
                </Button>
            </div>

            {error ? <p className="text-sm text-red-500">{error}</p> : null}

            {generatedSecret ? (
                <div className="pt-2">
                    <CopyableSecret value={generatedSecret} />
                </div>
            ) : null}
        </div>
    );
}
