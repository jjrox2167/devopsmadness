"use client";

import { DownloadIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Invoice } from "./billing-types";
import {
  formatBillingDate,
  formatMoney,
  invoiceStatusLabel,
} from "./billing-utils";

type InvoiceHistoryCardProps = {
  invoices: Invoice[];
};

export function InvoiceHistoryCard({ invoices }: InvoiceHistoryCardProps) {
  function openLink(url?: string | null, kind: "invoice" | "pdf" = "invoice") {
    if (!url) {
      toast.message(
        kind === "pdf"
          ? "PDF is not available for this invoice"
          : "Invoice link is not available",
      );
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Card className="w-full overflow-hidden gap-0 py-0">
      <CardHeader className="border-b py-5">
        <CardTitle>Billing history</CardTitle>
        <CardDescription>
          Invoices and receipts for this account.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 text-center">
            <FileTextIcon className="text-muted-foreground size-8" />
            <p className="text-sm font-medium">No invoices yet</p>
            <p className="text-muted-foreground max-w-sm text-sm">
              When you upgrade to a paid plan, invoices will appear here.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-10 px-4 text-xs font-medium tracking-wide uppercase">
                  Invoice
                </TableHead>
                <TableHead className="h-10 text-xs font-medium tracking-wide uppercase">
                  Date
                </TableHead>
                <TableHead className="h-10 text-xs font-medium tracking-wide uppercase">
                  Status
                </TableHead>
                <TableHead className="h-10 text-xs font-medium tracking-wide uppercase">
                  Amount
                </TableHead>
                <TableHead className="h-10 w-28 px-4 text-right text-xs font-medium tracking-wide uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="px-4 font-medium">
                    {invoice.number}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatBillingDate(invoice.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "paid"
                          ? "verified"
                          : invoice.status === "open"
                            ? "warning"
                            : "secondary"
                      }
                      className="font-normal"
                    >
                      {invoiceStatusLabel(invoice.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatMoney(invoice.amountDue / 100, invoice.currency)}
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`View invoice ${invoice.number}`}
                        onClick={() =>
                          openLink(invoice.hostedInvoiceUrl, "invoice")
                        }
                      >
                        <ExternalLinkIcon className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Download invoice ${invoice.number}`}
                        onClick={() => openLink(invoice.pdfUrl, "pdf")}
                      >
                        <DownloadIcon className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
