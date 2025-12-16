import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Divider,
} from "@heroui/react";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8787/ui/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT for cookies
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Login failed");
      }
      window.location.href = "/";
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/v1/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "/v1/auth/github";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-foreground-500">
            Log in to your account
          </p>
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />

          {error && (
            <p className="text-sm text-danger">
              {error}
            </p>
          )}

          <Button
            color="primary"
            isLoading={loading}
            onPress={handleLogin}
          >
            Log in
          </Button>

          <Divider />

          <div className="flex flex-col gap-2">
            <Button
              variant="bordered"
              onPress={handleGoogleLogin}
            >
              Continue with Google
            </Button>

            <Button
              variant="bordered"
              onPress={handleGithubLogin}
            >
              Continue with GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-foreground-500">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
