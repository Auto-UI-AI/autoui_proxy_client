import { useEffect, useMemo, useState } from "react";
import { Button, Input } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/providers/store";
import { tokenActions } from "@/features/token/model/tokenSlice";
import { CopyableSecret } from "@/shared/ui/CopyableSecret";
import { selectTokenState } from "../model/selectors";
import { fetchTokensThunk } from "../model/services/fetchTokensThunk";
import { generateTokenThunk } from "../model/services/generateTokenThunk";

export function GenerateTokenForm() {
    const dispatch = useDispatch<AppDispatch>();
    const { appId, loading, generatedSecret, error } = useSelector(selectTokenState);

    const [label, setLabel] = useState<string>("");

    const canSubmit = useMemo(() => appId.trim().length > 0 && !loading, [appId, loading]);

    useEffect(() => {
        // підтягуємо список при відкритті сторінки
        dispatch(fetchTokensThunk(appId));
    }, [dispatch, appId]);

    return (
        <div className="space-y-4">
            <Input
                label="App ID"
                value={appId}
                onChange={(e) => dispatch(tokenActions.setAppId(e.target.value))}
                placeholder="tasks-demo"
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
                        dispatch(tokenActions.clearGeneratedSecret());
                        await dispatch(generateTokenThunk({ appId, label: label || undefined }));
                        // рефетч list
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
