import { useEffect, useState } from "react";
import {
  FileText,
  Loader2,
  Receipt,
  CheckCircle2,
} from "lucide-react";
import api from "../services/api";

export default function InvoiceSection({ project }) {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const projectId = project?._id || project?.id;

  useEffect(() => {
    if (!projectId || project?.status !== "CLOSED") {
      setInvoice(null);
      return;
    }

    const fetchInvoice = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          `/invoices/project/${projectId}`
        );

        setInvoice(response.data.invoice);
      } catch (error) {
        // Invoice may not exist immediately after project closes.
        if (error.response?.status !== 404) {
          console.error(
            "Failed to fetch invoice:",
            error
          );
        }

        setInvoice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [projectId, project?.status]);

  // Project is not closed yet
  if (project?.status !== "CLOSED") {
    return (
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
            <Receipt
              size={21}
              className="text-slate-500"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Invoice
            </h2>

            <p className="text-sm text-slate-500">
              Invoice will be generated when the project is
              closed.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Project closed but invoice is still being generated
  if (loading && !invoice) {
    return (
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
            <Loader2
              size={21}
              className="animate-spin text-slate-500"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Invoice
            </h2>

            <p className="text-sm text-slate-500">
              Generating invoice...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Project closed but invoice not found
  if (!invoice) {
    return (
      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-center gap-3">
          <Receipt
            size={21}
            className="text-amber-600"
          />

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Invoice
            </h2>

            <p className="text-sm text-amber-700">
              Invoice has not been generated yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <FileText
                size={21}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Invoice
              </h2>

              <p className="text-sm text-slate-500">
                {invoice.invoiceNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
            <CheckCircle2
              size={16}
              className="text-emerald-600"
            />

            <span className="text-sm font-medium text-emerald-700">
              {invoice.status}
            </span>
          </div>
        </div>
      </div>

      {/* Invoice information */}
      <div className="grid grid-cols-1 gap-4 border-b border-slate-200 bg-slate-50/60 px-6 py-5 sm:grid-cols-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Invoice Number
          </p>

          <p className="mt-1 font-medium text-slate-900">
            {invoice.invoiceNumber}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Issued On
          </p>

          <p className="mt-1 font-medium text-slate-900">
            {invoice.issuedAt
              ? new Date(
                  invoice.issuedAt
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Currency
          </p>

          <p className="mt-1 font-medium text-slate-900">
            {invoice.currency || "INR"}
          </p>
        </div>
      </div>

      {/* Target group table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 bg-white">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Target Group
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Target
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                CPI
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {(invoice.items || []).map((item) => (
              <tr
                key={item.targetGroupId}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">
                    {item.targetGroupName}
                  </p>
                </td>

                <td className="px-6 py-4 text-right text-slate-700">
                  {item.targetCompletes}
                </td>

                <td className="px-6 py-4 text-right text-slate-700">
                  ₹{Number(item.cpi || 0).toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right font-medium text-slate-900">
                  ₹{Number(item.totalCost || 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="flex justify-end border-t border-slate-200 bg-slate-50/60 px-6 py-5">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Subtotal</span>

            <span>
              ₹{Number(invoice.subtotal || 0).toFixed(2)}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
            <span className="text-base font-semibold text-slate-900">
              Total
            </span>

            <span className="text-xl font-bold text-slate-900">
              ₹{Number(invoice.total || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}