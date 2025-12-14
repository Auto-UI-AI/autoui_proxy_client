import { ReactNode } from "react";
import { Card, CardBody } from "@heroui/react";

export function SectionCard({ children }: { children: ReactNode }) {
    return (
        <Card className="mb-6">
            <CardBody className="p-5">{children}</CardBody>
        </Card>
    );
}
