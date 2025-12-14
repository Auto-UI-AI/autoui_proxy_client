import { Button } from "@heroui/react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="py-16 text-center space-y-4">
            <h1 className="text-3xl font-semibold">404</h1>
            <p className="opacity-70">The page you are looking for does not exist.</p>
            <Button as={Link} to="/" color="primary">
                Go Home
            </Button>
        </div>
    );
}
