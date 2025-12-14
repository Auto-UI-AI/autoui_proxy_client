import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SectionCard } from "@/shared/ui/SectionCard";

export function HomePage() {
    return (
        <div>
            <PageHeader
                title="AutoUI Proxy Console"
                subtitle="Generate secure access tokens and connect AutoUI without exposing LLM API keys."
                right={
                    <Button as={Link} to="/tokens" color="primary">
                        Go to Tokens
                    </Button>
                }
            />

            <SectionCard>
                <div className="space-y-2">
                    <p className="opacity-80">
                        This console allows you to generate and manage proxy access tokens for your
                        applications. AutoUI clients communicate with the Proxy using a secure
                        Bearer token instead of direct LLM API keys.
                    </p>

                    <ul className="list-disc pl-5 text-sm opacity-70 space-y-1">
                        <li>Tokens are shown only once at creation time</li>
                        <li>View and revoke issued tokens</li>
                        <li>Quick Start with a ready-to-use integration snippet</li>
                    </ul>
                </div>
            </SectionCard>
        </div>
    );
}
