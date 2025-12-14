import { Snippet } from "@heroui/react";

export function CopyableSecret({ value }: { value: string }) {
    return (
        <div className="space-y-2">
            <p className="text-sm opacity-70">
                ⚠️ Скопіюй токен зараз — більше він не буде показаний.
            </p>
            <Snippet codeString={value} symbol="" className="w-full">
                {value}
            </Snippet>
        </div>
    );
}
