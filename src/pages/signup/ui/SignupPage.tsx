import React, { useState } from "react";
import { Card, CardBody, CardHeader, Input, Button, Divider } from "@heroui/react";

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setError(null);

    const e = email.trim().toLowerCase();
    if (!e || !password) return setError("Email and password are required.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8787/ui/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT for cookies
        body: JSON.stringify({ email: e, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Signup failed");
      }
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "/v1/auth/google";
  };

  const handleGithubSignup = () => {
    window.location.href = "/v1/auth/github";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-sm text-foreground-500">Sign up to get started</p>
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            isRequired
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            isRequired
          />

          <Input
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            isRequired
          />

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button color="primary" isLoading={loading} onPress={handleSignup}>
            Sign up
          </Button>

          <Divider />

          <div className="flex flex-col gap-2">
            <Button variant="bordered" onPress={handleGoogleSignup}>
              Continue with Google
            </Button>

            <Button variant="bordered" onPress={handleGithubSignup}>
              Continue with GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-foreground-500">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-medium hover:underline">
              Log in
            </a>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignupPage;
