import { useSelector } from "react-redux";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SectionCard } from "@/shared/ui/SectionCard";
import { Snippet } from "@heroui/react";
import { env } from "@/shared/config/env";
import { selectTokenState } from "@/features/token/model/selectors";

export function QuickStartPage() {
    const { appId } = useSelector(selectTokenState);

    const installCode = `npm install @autoai-ui/autoui`;

    const envCode = `VITE_AUTOUI_PROXY_URL=${env.apiBaseUrl}/v1/chat
VITE_AUTOUI_SHARED_SECRET=your-shared-secret`;

    const configCode = `import type { AutoUIConfig } from "@autoai-ui/autoui";

export const autoUiConfig: AutoUIConfig = {
  appId: "${appId}",

  llm: {
    proxyUrl: import.meta.env.VITE_AUTOUI_PROXY_URL,
    sharedSecret: import.meta.env.VITE_AUTOUI_SHARED_SECRET,

    temperature: 0.2,
    maxTokens: 2048,

    appDescriptionPrompt:
      "Describe your app UI and available actions here.",
  },

  runtime: {
    validateLLMOutput: true,
    storeChatToLocalStorage: true,
    localStorageKey: "autoui_chat_history",
    enableDebugLogs: true,
    maxSteps: 20,
  },

  functions: {
    // Declare callable functions here
  },

  components: {
    // Declare renderable UI components here
  },
};`;

    const usageCode = `import { ModalChat } from "@autoai-ui/autoui";
import { autoUiConfig } from "./autoUiConfig";

export function App() {
  return (
    <main>
      <YourAppUI />
      <ModalChat config={autoUiConfig} />
    </main>
  );
}`;

    return (
        <div className="space-y-8">
            <PageHeader
                title="Quick Start"
                subtitle="Connect your React app to AutoUI Proxy and enable AI-driven UI."
            />

            <SectionCard>
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold">1. Install the AutoUI package</h2>
                    <p className="text-sm opacity-70">
                        AutoUI provides a React-based chat runtime that communicates with your
                        backend Proxy instead of calling LLM APIs directly from the browser.
                    </p>

                    <Snippet codeString={installCode} symbol="">
                        {installCode}
                    </Snippet>
                </div>
            </SectionCard>

            <SectionCard>
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold">2. Configure environment variables</h2>
                    <p className="text-sm opacity-70">
                        The browser never talks to OpenAI / OpenRouter directly. All requests go
                        through your AutoUI Proxy.
                    </p>

                    <Snippet codeString={envCode} symbol="" className="whitespace-pre-wrap">
                        {envCode}
                    </Snippet>
                </div>
            </SectionCard>

            <SectionCard>
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold">3. Create AutoUI configuration</h2>
                    <p className="text-sm opacity-70">
                        AutoUIConfig defines how the AI can interact with your application: which UI
                        components it can render and which functions it can call.
                    </p>

                    <Snippet codeString={configCode} symbol="" className="whitespace-pre-wrap">
                        {configCode}
                    </Snippet>
                </div>
            </SectionCard>

            <SectionCard>
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold">4. Mount the Chat UI</h2>
                    <p className="text-sm opacity-70">
                        Use the ModalChat component to enable AI interaction on top of your existing
                        UI. The chat communicates with your Proxy using streaming responses (SSE).
                    </p>

                    <Snippet codeString={usageCode} symbol="" className="whitespace-pre-wrap">
                        {usageCode}
                    </Snippet>
                </div>
            </SectionCard>

            <SectionCard>
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Security model</h2>
                    <ul className="list-disc pl-5 text-sm opacity-70 space-y-1">
                        <li>LLM API keys are stored only on the backend</li>
                        <li>The browser authenticates using a Proxy token or shared secret</li>
                        <li>Model, rate limits and tools are enforced by the Proxy</li>
                        <li>The client cannot bypass Proxy policies</li>
                    </ul>
                </div>
            </SectionCard>
        </div>
    );
}
