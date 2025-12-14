import { Snippet } from "@heroui/react";

export function CopyableSecret({ value }: { value: string }) {
    return (
        <div className="space-y-2">
            <p className="text-sm opacity-70">⚠️ Copy token now — it will not be shown again.</p>
            <Snippet codeString={value} symbol="" className="w-full">
                {value}
            </Snippet>
        </div>
    );
}
