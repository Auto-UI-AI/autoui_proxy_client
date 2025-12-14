import { useSelector } from "react-redux";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SectionCard } from "@/shared/ui/SectionCard";
import { Snippet } from "@heroui/react";
import { env } from "@/shared/config/env";
import { selectTokenState } from "@/features/token/model/selectors";

export function QuickStartPage() {
    const { appId } = useSelector(selectTokenState);

    const code = `import { createAutoUIClient } from "@autoui/client";

const client = createAutoUIClient({
  proxyUrl: "${env.apiBaseUrl}/v1/chat",
  token: "autoui_sk_live_xxx",
  appId: "${appId}",
});`;

    return (
        <div>
            <PageHeader
                title="Quick Start"
                subtitle="Copy the snippet below to connect AutoUI to your Proxy."
            />

            <SectionCard>
                <div className="space-y-3">
                    <p className="text-sm opacity-70">1) Install the AutoUI client:</p>

                    <Snippet codeString="npm i @autoui/client" symbol="">
                        npm i @autoui/client
                    </Snippet>

                    <p className="text-sm opacity-70">2) Create a client instance:</p>

                    <Snippet codeString={code} symbol="" className="w-auto whitespace-pre-wrap">
                        {code}
                    </Snippet>
                </div>
            </SectionCard>
        </div>
    );
}
