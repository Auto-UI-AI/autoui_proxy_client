import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/notfound";
import { QuickStartPage } from "@/pages/quickstart";
import { TokensPage } from "@/pages/token";
import { AppShell } from "@/widgets/layout/ui/AppShell";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        element: <AppShell />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/tokens", element: <TokensPage /> },
            { path: "/quickstart", element: <QuickStartPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
