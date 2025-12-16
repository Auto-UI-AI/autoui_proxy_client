import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login/ui/LoginPage";
import { NotFoundPage } from "@/pages/notfound";
import { QuickStartPage } from "@/pages/quickstart";
import { SignupPage } from "@/pages/signup/ui/SignupPage";
import { TokensPage } from "@/pages/token";
import { TokenApiKeyPage } from "@/pages/token/ui/TokenApiKeyPage";
import { AppShell } from "@/widgets/layout/ui/AppShell";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/tokens", element: <TokensPage /> },
      { path: "/tokens-apiKey", element: <TokenApiKeyPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/quickstart", element: <QuickStartPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
