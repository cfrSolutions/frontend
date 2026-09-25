// import { useEffect, useState } from "react";
// import {
//   FileText,
//   Loader2,
//   Receipt,
//   CheckCircle2,
// } from "lucide-react";
// import api from "../services/api";

// export default function InvoiceSection({ project }) {
//   const [invoice, setInvoice] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const projectId = project?._id || project?.id;

//   useEffect(() => {
//     if (!projectId || project?.status !== "CLOSED") {
//       setInvoice(null);
//       return;
//     }

//     const fetchInvoice = async () => {
//       try {
//         setLoading(true);

//         const response = await api.get(
//           `/invoices/project/${projectId}`
//         );

//         setInvoice(response.data.invoice);
//       } catch (error) {
//         // Invoice may not exist immediately after project closes.
//         if (error.response?.status !== 404) {
//           console.error(
//             "Failed to fetch invoice:",
//             error
//           );
//         }

//         setInvoice(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvoice();
//   }, [projectId, project?.status]);

//   // Project is not closed yet
//   if (project?.status !== "CLOSED") {
//     return (
//       <section className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-6">
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
//             <Receipt
//               size={21}
//               className="text-slate-500"
//             />
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-[#0F172A]">
//               Invoice
//             </h2>

//             <p className="text-sm text-slate-500">
//               Invoice will be generated when the project is
//               closed.
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Project closed but invoice is still being generated
//   if (loading && !invoice) {
//     return (
//       <section className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-6">
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
//             <Loader2
//               size={21}
//               className="animate-spin text-slate-500"
//             />
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-[#0F172A]">
//               Invoice
//             </h2>

//             <p className="text-sm text-slate-500">
//               Generating invoice...
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Project closed but invoice not found
//   if (!invoice) {
//     return (
//       <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
//         <div className="flex items-center gap-3">
//           <Receipt
//             size={21}
//             className="text-amber-600"
//           />

//           <div>
//             <h2 className="text-lg font-semibold text-[#0F172A]">
//               Invoice
//             </h2>

//             <p className="text-sm text-amber-700">
//               Invoice has not been generated yet.
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="mt-8 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
//       {/* Header */}
//       <div className="border-b border-[#E2E8F0] px-6 py-5">
//         <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
//               <FileText
//                 size={21}
//                 className="text-blue-600"
//               />
//             </div>

//             <div>
//               <h2 className="text-lg font-semibold text-[#0F172A]">
//                 Invoice
//               </h2>

//               <p className="text-sm text-slate-500">
//                 {invoice.invoiceNumber}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
//             <CheckCircle2
//               size={16}
//               className="text-emerald-600"
//             />

//             <span className="text-sm font-medium text-emerald-700">
//               {invoice.status}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Invoice information */}
//       <div className="grid grid-cols-1 gap-4 border-b border-[#E2E8F0] bg-slate-50/60 px-6 py-5 sm:grid-cols-3">
//         <div>
//           <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//             Invoice Number
//           </p>

//           <p className="mt-1 font-medium text-[#0F172A]">
//             {invoice.invoiceNumber}
//           </p>
//         </div>

//         <div>
//           <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//             Issued On
//           </p>

//           <p className="mt-1 font-medium text-[#0F172A]">
//             {invoice.issuedAt
//               ? new Date(
//                   invoice.issuedAt
//                 ).toLocaleDateString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 })
//               : "-"}
//           </p>
//         </div>

//         <div>
//           <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//             Currency
//           </p>

//           <p className="mt-1 font-medium text-[#0F172A]">
//             {invoice.currency || "INR"}
//           </p>
//         </div>
//       </div>

//       {/* Target group table */}
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[700px]">
//           <thead>
//             <tr className="border-b border-[#E2E8F0] bg-white">
//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
//                 Target Group
//               </th>

//               <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
//                 Target
//               </th>

//               <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
//                 CPI
//               </th>

//               <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
//                 Total
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {(invoice.items || []).map((item) => (
//               <tr
//                 key={item.targetGroupId}
//                 className="border-b border-[#F1F5F9] last:border-0"
//               >
//                 <td className="px-6 py-4">
//                   <p className="font-medium text-[#0F172A]">
//                     {item.targetGroupName}
//                   </p>
//                 </td>

//                 <td className="px-6 py-4 text-right text-[#334155]">
//                   {item.targetCompletes}
//                 </td>

//                 <td className="px-6 py-4 text-right text-[#334155]">
//                   ${Number(item.cpi || 0).toFixed(2)}
//                 </td>

//                 <td className="px-6 py-4 text-right font-medium text-[#0F172A]">
//                   ${Number(item.totalCost || 0).toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Total */}
//       <div className="flex justify-end border-t border-[#E2E8F0] bg-slate-50/60 px-6 py-5">
//         <div className="w-full max-w-sm">
//           <div className="flex items-center justify-between text-sm text-slate-500">
//             <span>Subtotal</span>

//             <span>
//               ${Number(invoice.subtotal || 0).toFixed(2)}
//             </span>
//           </div>

//           <div className="mt-3 flex items-center justify-between border-t border-[#E2E8F0] pt-3">
//             <span className="text-base font-semibold text-[#0F172A]">
//               Total
//             </span>

//             <span className="text-xl font-bold text-[#0F172A]">
//               ${Number(invoice.total || 0).toFixed(2)}
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import { useEffect, useState } from "react";
import {
  Loader2,
  Receipt,
  CheckCircle2,
  Printer,
  Download,
} from "lucide-react";


import api from "../services/api";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

export default function InvoiceSection({ project, invoiceId = null, }) {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [business, setBusiness] = useState(null);
  const [creatingPayment, setCreatingPayment] =
  useState(false);

  const [paymentMessage, setPaymentMessage] =
  useState("");

  const projectId = project?._id || project?.id;

  // =====================================================
  // FETCH INVOICE
  // =====================================================

  useEffect(() => {
    if (!projectId || project?.status !== "CLOSED") {
      setInvoice(null);
      setBusiness(null);
      return;
    }

    const fetchInvoice = async () => {
      try {
        setLoading(true);

       const response = await api.get(
  invoiceId
    ? `/invoices/${invoiceId}`
    : `/invoices/project/${projectId}`
);

        setInvoice(response.data.invoice);
        setBusiness(response.data.business);
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error(
            "Failed to fetch invoice:",
            error
          );
        }

        setInvoice(null);
        setBusiness(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [projectId, project?.status, invoiceId,]);

  // =====================================================
  // PROJECT NOT CLOSED
  // =====================================================

  if (project?.status !== "CLOSED") {
    return (
      <section className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
            <Receipt
              size={21}
              className="text-[#64748B]"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#FE8a00]">
              Invoice
            </h2>

            <p className="text-sm text-[#64748B]">
              Invoice will be generated when the project
              is closed.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (loading && !invoice) {
    return (
      <section className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-6">
        <div className="flex items-center gap-3">
          <Loader2
            size={22}
            className="animate-spin text-blue-600"
          />

          <div>
            <h2 className="text-lg font-semibold text-[#FE8a00]">
              Invoice
            </h2>

            <p className="text-sm text-[#64748B]">
              Generating invoice...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // NO INVOICE
  // =====================================================

  if (!invoice) {
    return (
      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-center gap-3">
          <Receipt
            size={21}
            className="text-amber-600"
          />

          <div>
            <h2 className="text-lg font-semibold text-[#FF8A00]">
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

  // =====================================================
  // CALCULATIONS
  // =====================================================

  const subtotal = Number(
    invoice.subtotal || 0
  );

  const gstRate = Number(
    invoice.gstRate || 0
  );

  const gstAmount =
    invoice.gstAmount !== undefined
      ? Number(invoice.gstAmount || 0)
      : subtotal * (gstRate / 100);

  const total =
    invoice.total !== undefined
      ? Number(invoice.total || 0)
      : subtotal + gstAmount;

  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

 const handleTestPayment = async () => {
  if (!projectId || creatingPayment) return;

  try {
    setCreatingPayment(true);
    setPaymentMessage("");

    // 1. Load Razorpay Checkout
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      throw new Error(
        "Unable to load payment checkout"
      );
    }

    // 2. Create order securely from backend
    const response = await api.post(
      `/payments/invoice/${invoice._id}/order`
    );

    const { order, keyId } = response.data;

    if (!order?.id || !keyId) {
      throw new Error(
        "Payment order could not be created"
      );
    }

    // 3. Razorpay Checkout options
    const options = {
      key: keyId,

      amount: order.amount,

      currency: order.currency,

      order_id: order.id,

      name: "Inputify",

      description: `Invoice ${invoice.invoiceNumber}`,

     handler: async function (response) {
  try {
    setPaymentMessage(
      "Payment received. Verifying payment..."
    );

    const verifyResponse = await api.post(
      `/payments/invoice/${invoice._id}/verify`,
      {
        razorpay_order_id:
          response.razorpay_order_id,

        razorpay_payment_id:
          response.razorpay_payment_id,

        razorpay_signature:
          response.razorpay_signature,
      }
    );

    if (!verifyResponse.data?.success) {
      throw new Error(
        "Payment verification failed"
      );
    }

    // Update invoice immediately
    setInvoice((currentInvoice) => ({
      ...currentInvoice,
      status: "PAID",
    }));

    setPaymentMessage(
      "Payment completed successfully."
    );

  } catch (error) {
   
    setPaymentMessage(
      error.response?.data?.message ||
        "Payment was received but could not be verified. Please contact support."
    );
  }
},

      modal: {
        ondismiss: function () {
          setPaymentMessage(
            "Payment checkout was closed."
          );
        },
      },

      theme: {
        color: "#059669",
      },
    };

    // 4. Open Razorpay
    const razorpay = new window.Razorpay(
      options
    );

    razorpay.open();

  } catch (error) {
    console.error(
      "Failed to start payment:",
      error
    );

    setPaymentMessage(
      error.response?.data?.message ||
        error.message ||
        "Failed to start payment"
    );
  } finally {
    setCreatingPayment(false);
  }
};
  // =====================================================
  // PRINT
  // =====================================================

  const handlePrint = async () => {
  if (!invoice?._id) {
    console.error("Invoice ID is missing");
    return;
  }

  try {
    const response = await api.get(
      `/invoices/${invoice._id}/pdf`,
      {
        responseType: "blob",
      }
    );

    const pdfBlob = new Blob(
      [response.data],
      {
        type: "application/pdf",
      }
    );

    const pdfUrl =
      window.URL.createObjectURL(pdfBlob);

    const printWindow =
      window.open(pdfUrl, "_blank");

    if (!printWindow) {
      window.URL.revokeObjectURL(pdfUrl);
      return;
    }

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };

    // Don't revoke immediately because
    // the new tab still needs the blob URL.
    setTimeout(() => {
      window.URL.revokeObjectURL(pdfUrl);
    }, 60000);
  } catch (error) {
    console.error(
      "Failed to print invoice:",
      error
    );

    alert("Unable to print invoice");
  }
};

const handleDownloadPDF = async () => {
  if (downloading) {
    return;
  }

  if (!invoice?._id) {
    console.error(
      "Project ID is missing"
    );

    return;
  }

  try {
    setDownloading(true);

    const response =
      await api.get(
        `/invoices/${invoice._id}/pdf`,
        {
          responseType: "blob",
        }
      );


    /* =========================================
       CREATE PDF BLOB
    ========================================= */

    const pdfBlob =
      new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );


    /* =========================================
       CREATE TEMPORARY URL
    ========================================= */

    const downloadUrl =
      window.URL.createObjectURL(
        pdfBlob
      );


    /* =========================================
       FILE NAME
    ========================================= */

    const invoiceNumber =
  invoice?.invoiceNumber ||
  `invoice-${invoice._id}`;

    const safeInvoiceNumber =
      String(invoiceNumber)
        .replace(
          /[^a-zA-Z0-9-_]/g,
          "_"
        );


    /* =========================================
       DOWNLOAD
    ========================================= */

    const link =
      document.createElement("a");

    link.href =
      downloadUrl;

    link.download =
      `${safeInvoiceNumber}.pdf`;

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();


    /* =========================================
       CLEAN MEMORY
    ========================================= */

    window.URL.revokeObjectURL(
      downloadUrl
    );

  } catch (error) {

    console.error(
      "Failed to download invoice PDF:",
      error
    );

    alert(
      "Unable to download invoice PDF"
    );

  } finally {

    setDownloading(false);
  }
};

  const invoiceDate = invoice.issuedAt
    ? new Date(
        invoice.issuedAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  // =====================================================
  // BUSINESS INFORMATION
  // =====================================================

 const businessName =
  business?.company ||
  business?.name ||
  "Business Name";

const businessContact =
  business?.email ||
  "-";

const businessPhone =
  business?.phone ||
  "-";

const businessAddress =
  [
    business?.location,
    business?.country,
    business?.postalCode,
  ]
    .filter(Boolean)
    .join(", ") ||
  "-";
  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* =================================================
          ACTION BUTTONS
      ================================================= */}

      <div className="mt-8 mb-4 flex justify-end gap-3 print:hidden">
        <button
  onClick={handleTestPayment}
  disabled={
    creatingPayment ||
    invoice.status === "PAID"
  }
  className="
    inline-flex
    items-center
    gap-2
    rounded-lg
    bg-emerald-600
    px-4
    py-2.5
    text-sm
    font-medium
    text-white
    transition
    hover:bg-emerald-700
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {creatingPayment ? (
    <>
      <Loader2
        size={17}
        className="animate-spin"
      />
      Creating Order...
    </>
  ) : invoice.status === "PAID" ? (
    <>
      <CheckCircle2 size={17} />
      Paid
    </>
  ) : (
    "Pay Now"
  )}
</button>

        {/* DOWNLOAD PDF */}

        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-[#164B84]
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-[#123d6d]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {downloading ? (
            <>
              <Loader2
                size={17}
                className="animate-spin"
              />

              Generating PDF...
            </>
          ) : (
            <>
              <Download size={17} />

              Download PDF
            </>
          )}
        </button>


        {/* PRINT */}

        <button
          onClick={handlePrint}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-[#E2E8F0]
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-[#334155]
            transition
            hover:bg-slate-50
          "
        >
          <Printer size={17} />

          Print Invoice
        </button>

      </div>
      {paymentMessage && (
  <div className="mx-auto mb-4 max-w-[794px] rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
    {paymentMessage}
  </div>
)}

      {/* =================================================
          INVOICE
      ================================================= */}

      <section
        id="invoice"
        className="
          mx-auto
          mt-4
          w-full
          max-w-[794px]
          overflow-hidden
          rounded-[28px]
          bg-white
          shadow-xl

          print:mt-0
          print:max-w-none
          print:rounded-none
          print:shadow-none
        "
      >

        {/* =================================================
            TOP BLUE BAR
        ================================================= */}

        <div
          className="
            h-10
            bg-[#FE8a00]
          "
        />


        {/* =================================================
            INVOICE CONTENT

            A4-like minimum height.

            If there are only a few target groups,
            invoice stays approximately one page.

            If there are many target groups,
            content naturally grows.
        ================================================= */}

        <div
          className="
            flex
            min-h-[1040px]
            flex-col
            px-8
            py-8
            sm:px-12
          "
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex items-start justify-between gap-6">

            {/* BRAND */}

            <div>

             <img
  src="/HomeImage/inputify.png"
  alt="Inputify"
  className="h-20 w-auto object-contain"
/>

              <p className="mt-2 text-xs font-medium text-[#64748B]">
                Survey & Research Platform
              </p>

            </div>


            {/* INVOICE TITLE */}

            <div className="text-right">

              <h2
                className="
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-[#FE8a00]
                "
              >
                INVOICE
              </h2>

              <p className="mt-1 text-xs text-[#64748B]">
                GSTIN: {invoice.gstin || "—"}
              </p>

            </div>

          </div>


          {/* =================================================
              BILLING INFORMATION
          ================================================= */}

          <div
            className="
              mt-9
              grid
              grid-cols-1
              gap-8
              sm:grid-cols-2
            "
          >

            {/* BILL TO */}

            <div>

              <h3 className="text-sm font-semibold text-[#FE8a00]">
                Bill To:
              </h3>

              <p className="mt-1 text-sm font-semibold text-[#1E293B]">
                {businessName}
              </p>

              <p className="text-sm text-[#64748B]">
                {businessAddress}
              </p>

            </div>


            {/* INVOICE DETAILS */}

            <div className="sm:text-right">

              <div
                className="
                  grid
                  grid-cols-[110px_1fr]
                  gap-x-3
                  gap-y-1
                  text-sm
                  sm:grid-cols-[auto_auto]
                "
              >

                <span className="text-[#64748B]">
                  Invoice Number
                </span>

                <span className="font-medium text-[#64748B]">
                  {invoice.invoiceNumber}
                </span>


                <span className="text-[#64748B]">
                  Invoice Date
                </span>

                <span className="font-medium text-[#64748B]">
                  {invoiceDate}
                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              CONTACT + PAYMENT
          ================================================= */}

          <div
            className="
              mt-7
              grid
              grid-cols-1
              gap-8
              sm:grid-cols-2
            "
          >

            {/* CONTACT */}

            <div>

              <h3 className="text-sm font-semibold text-[#FE8a00]">
                Contact information
              </h3>

              <p className="mt-1 text-sm text-[#475569]">
                Email: {businessContact}
              </p>

              <p className="text-sm text-[#475569]">
                Phone: {businessPhone}
              </p>

            </div>


            {/* PAYMENT */}

            <div>

              <h3 className="text-sm font-semibold text-[#FE8a00]">
                Payment information
              </h3>

              <p className="mt-1 text-sm text-[#475569]">
                Bank Name:{" "}
                {invoice.bankName || "—"}
              </p>

              <p className="text-sm text-[#475569]">
                Account Number:{" "}
                {invoice.accountNumber || "—"}
              </p>

            </div>

          </div>


          {/* =================================================
              ITEMS
          ================================================= */}

          <div className="mt-8 overflow-hidden">

            <table className="w-full">

              <thead>

                <tr className="border-y-2 border-[#FE8a00]">

                  <th className="py-2.5 text-left text-xs font-semibold text-[#334155]">
                    Item Description
                  </th>

                  <th className="py-2.5 text-center text-xs font-semibold text-[#334155]">
                    Quantity
                  </th>

                  <th className="py-2.5 text-right text-xs font-semibold text-[#334155]">
                    Rate
                  </th>

                  <th className="py-2.5 text-right text-xs font-semibold text-[#334155]">
                    Total
                  </th>

                </tr>

              </thead>


              <tbody>

                {(invoice.items || []).map(
                  (item, index) => {

                    const quantity =
                      Number(
                        item.targetCompletes || 0
                      );

                    const rate =
                      Number(
                        item.cpi || 0
                      );

                    const itemTotal =
                      Number(
                        item.totalCost || 0
                      );

                    return (
                      <tr
                        key={
                          item.targetGroupId ||
                          index
                        }
                        className="
                          border-b
                          border-[#FE8a00]
                        "
                      >

                        <td className="py-3 text-sm text-[#334155]">

                          <p className="font-medium text-[#1E293B]">
                            {item.targetGroupName}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            Target Group
                          </p>

                        </td>


                        <td className="py-3 text-center text-sm text-[#475569]">
                          {quantity}
                        </td>


                        <td className="py-3 text-right text-sm text-[#475569]">
                          ${rate.toFixed(2)}
                        </td>


                        <td className="py-3 text-right text-sm font-medium text-[#1E293B]">
                          ${itemTotal.toFixed(2)}
                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>


          {/* =================================================
              TOTALS

              mt-auto pushes this section toward the
              bottom when there is available space.
          ================================================= */}

          <div className="mt-auto flex justify-end">

            <div className="w-full max-w-xs">

              {/* SUBTOTAL */}

              <div className="flex justify-between text-sm text-[#475569]">

                <span>
                  Subtotal:
                </span>

                <span className="font-medium text-[#1E293B]">
                  ${subtotal.toFixed(2)}
                </span>

              </div>


              {/* GST */}

              <div className="mt-2 flex justify-between text-sm text-[#475569]">

                <span>
                  GST ({gstRate}%):
                </span>

                <span className="font-medium text-[#1E293B]">
                  ${gstAmount.toFixed(2)}
                </span>

              </div>


              {/* TOTAL */}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  border-y-2
                  border-[#FE8a00]
                  py-2
                "
              >

                <span className="font-semibold text-[#1E293B]">
                  Total Amount Due:
                </span>

                <span className="text-lg font-bold text-[#0F172A]">
                  ${total.toFixed(2)}
                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              TERMS + SIGNATURE
          ================================================= */}

          <div
            className="
              mt-7
              grid
              grid-cols-1
              gap-8
              sm:grid-cols-2
            "
          >

            {/* TERMS */}

            <div>

              <h3 className="text-sm font-semibold text-[#334155]">
                Terms and Conditions
              </h3>

              <p className="mt-1 max-w-md text-xs leading-5 text-[#64748B]">
                Payment is due as per the agreed project
                terms. Please contact Inputify for any
                questions regarding this invoice.
              </p>

            </div>


            {/* SIGNATURE */}

            <div className="flex flex-col items-start sm:items-end">

              <p className="text-xs text-[#64748B]">
                Authorized Signatory
              </p>

              <p
                className="
                  mt-2
                  font-serif
                  text-xl
                  italic
                  text-[#FE8a00]
                "
              >
                Inputify
              </p>

            </div>

          </div>


          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              mt-7
              border-y-2
              border-[#164B84]
              py-2.5
            "
          >

            <div
              className="
                flex
                flex-col
                gap-2
                text-xs
                text-[#00000]
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <span>
                hello@inputify.io
              </span>

              <span>
                inputify.io
              </span>

              <span>
                Phone: 7506966099
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            BOTTOM BLUE BAR
        ================================================= */}

        <div
          className="
            h-10
            bg-[#FE8a00]
          "
        />

      </section>
    </>
  );
}