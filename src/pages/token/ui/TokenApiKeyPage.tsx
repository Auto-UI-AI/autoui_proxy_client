import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/providers/store";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SectionCard } from "@/shared/ui/SectionCard";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@heroui/react";
import { selectTokenState } from "@/features/token/model/selectors";
import { GenerateTokenWithApiKeyForm } from "@/features/token/ui/GenerateTokenWithApiKeyForm";
import { revokeTokenThunk } from "@/features/token/model/services/revokeTokenThunk";

export function TokenApiKeyPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector(selectTokenState);

    return (
        <div>
            <PageHeader
                title="Access Tokens"
                subtitle="Generate and manage secure tokens for accessing the AutoUI Proxy."
            />

            <SectionCard>
                <GenerateTokenWithApiKeyForm />
            </SectionCard>

            <SectionCard>
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Issued Tokens</h2>
                    <span className="text-sm opacity-60">{items?.length ?? 0} total</span>
                </div>

                {items?.length ? (
                    <Table aria-label="tokens table">
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>Label</TableColumn>
                            <TableColumn>Created At</TableColumn>
                            <TableColumn>Last Used</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>

                        <TableBody emptyContent={"No tokens issued yet"}>
                            {items.map((t) => (
                                <TableRow key={t.id}>
                                    <TableCell className="font-mono text-xs">{t.id}</TableCell>
                                    <TableCell>{t.label || "—"}</TableCell>
                                    <TableCell>{new Date(t.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>
                                        {t.lastUsedAt
                                            ? new Date(t.lastUsedAt).toLocaleString()
                                            : "Never"}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            color="danger"
                                            variant="flat"
                                            isLoading={loading}
                                            onPress={() => dispatch(revokeTokenThunk(t.id))}
                                        >
                                            Revoke
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div>No tokens</div>
                )}
            </SectionCard>
        </div>
    );
}
