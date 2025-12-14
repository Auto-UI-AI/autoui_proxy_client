import { ReactNode } from "react";

export function PageHeader({
    title,
    subtitle,
    right,
}: {
    title: string;
    subtitle?: string;
    right?: ReactNode;
}) {
    return (
        <div className="mb-6 flex items-start justify-between gap-4">
            <div>
                <h1 className="text-2xl font-semibold">{title}</h1>
                {subtitle ? <p className="mt-1 text-sm opacity-70">{subtitle}</p> : null}
            </div>
            {right}
        </div>
    );
}
