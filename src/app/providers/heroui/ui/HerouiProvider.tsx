import { HeroUIProvider as UIProvider } from "@heroui/react";
import { type ReactNode } from "react";

export function HerouiProvider({ children }: { children: ReactNode }) {
    return <UIProvider>{children}</UIProvider>;
}
