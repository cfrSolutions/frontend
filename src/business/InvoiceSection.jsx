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
//       <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
//             <Receipt
//               size={21}
//               className="text-slate-500"
//             />
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-slate-900">
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
//       <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
//             <Loader2
//               size={21}
//               className="animate-spin text-slate-500"
//             />
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-slate-900">
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
//             <h2 className="text-lg font-semibold text-slate-900">
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
//     <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
//       {/* Header */}
//       <div className="border-b border-slate-200 px-6 py-5">
//         <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
//               <FileText
//                 size={21}
//                 className="text-blue-600"
//               />
//             </div>

//             <div>
//               <h2 className="text-lg font-semibold text-slate-900">
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
//       <div className="grid grid-cols-1 gap-4 border-b border-slate-200 bg-slate-50/60 px-6 py-5 sm:grid-cols-3">
//         <div>
//           <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//             Invoice Number
//           </p>

//           <p className="mt-1 font-medium text-slate-900">
//             {invoice.invoiceNumber}
//           </p>
//         </div>

//         <div>
//           <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//             Issued On
//           </p>

//           <p className="mt-1 font-medium text-slate-900">
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

//           <p className="mt-1 font-medium text-slate-900">
//             {invoice.currency || "INR"}
//           </p>
//         </div>
//       </div>

//       {/* Target group table */}
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[700px]">
//           <thead>
//             <tr className="border-b border-slate-200 bg-white">
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
//                 className="border-b border-slate-100 last:border-0"
//               >
//                 <td className="px-6 py-4">
//                   <p className="font-medium text-slate-900">
//                     {item.targetGroupName}
//                   </p>
//                 </td>

//                 <td className="px-6 py-4 text-right text-slate-700">
//                   {item.targetCompletes}
//                 </td>

//                 <td className="px-6 py-4 text-right text-slate-700">
//                   ₹{Number(item.cpi || 0).toFixed(2)}
//                 </td>

//                 <td className="px-6 py-4 text-right font-medium text-slate-900">
//                   ₹{Number(item.totalCost || 0).toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Total */}
//       <div className="flex justify-end border-t border-slate-200 bg-slate-50/60 px-6 py-5">
//         <div className="w-full max-w-sm">
//           <div className="flex items-center justify-between text-sm text-slate-500">
//             <span>Subtotal</span>

//             <span>
//               ₹{Number(invoice.subtotal || 0).toFixed(2)}
//             </span>
//           </div>

//           <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
//             <span className="text-base font-semibold text-slate-900">
//               Total
//             </span>

//             <span className="text-xl font-bold text-slate-900">
//               ₹{Number(invoice.total || 0).toFixed(2)}
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

  // =====================================================
  // PROJECT NOT CLOSED
  // =====================================================

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
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <Loader2
            size={22}
            className="animate-spin text-blue-600"
          />

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

  // =====================================================
  // CALCULATIONS
  // =====================================================

  const subtotal = Number(invoice.subtotal || 0);

  // Use backend GST if available.
  // Otherwise GST defaults to 0.
  const gstRate = Number(invoice.gstRate || 0);

  const gstAmount =
    Number(invoice.gstAmount) ||
    subtotal * (gstRate / 100);

  const total =
    Number(invoice.total || 0) ||
    subtotal + gstAmount;

  // =====================================================
  // PRINT
  // =====================================================

  const handlePrint = () => {
  window.print();
};

const handleDownloadPDF = async () => {
  const invoiceElement =
    document.getElementById("invoice");

  if (!invoiceElement) {
    console.error("Invoice element not found");
    return;
  }

  try {
    const canvas = await html2canvas(invoiceElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const margin = 8;

    const usableWidth =
      pageWidth - margin * 2;

    const imageHeight =
      (canvas.height * usableWidth) /
      canvas.width;

    let heightLeft = imageHeight;
    let position = margin;

    // First page
    pdf.addImage(
      imgData,
      "PNG",
      margin,
      position,
      usableWidth,
      imageHeight
    );

    heightLeft -=
      pageHeight - margin * 2;

    // Additional pages if invoice becomes longer
    while (heightLeft > 0) {
      position =
        heightLeft -
        imageHeight +
        margin;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        position,
        usableWidth,
        imageHeight
      );

      heightLeft -=
        pageHeight - margin * 2;
    }

    const invoiceNumber =
      invoice?.invoiceNumber ||
      "invoice";

    pdf.save(
      `${invoiceNumber}.pdf`
    );
  } catch (error) {
    console.error(
      "Failed to generate invoice PDF:",
      error
    );

    alert(
      "Unable to download invoice PDF"
    );
  }
};
  // =====================================================
  // DATE
  // =====================================================

  const invoiceDate = invoice.issuedAt
    ? new Date(invoice.issuedAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "-";

  // =====================================================
  // BUSINESS INFORMATION
  // =====================================================

  const businessName =
    project?.business?.company ||
    project?.business?.name ||
    project?.company ||
    "Business Name";

  const businessContact =
    project?.business?.email ||
    project?.business?.emailAddress ||
    "-";

  const businessPhone =
    project?.business?.phone ||
    project?.business?.phoneNumber ||
    "-";

  const businessAddress =
    project?.business?.location ||
    project?.business?.address ||
    "-";

  return (
    <>
      {/* =================================================
          PRINT BUTTON
      ================================================= */}

     <div className="mt-8 mb-4 flex justify-end gap-3 print:hidden">

  {/* DOWNLOAD PDF */}

  <button
    onClick={handleDownloadPDF}
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
    "
  >
    <Download size={17} />
    Download PDF
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
      border-slate-200
      bg-white
      px-4
      py-2.5
      text-sm
      font-medium
      text-slate-700
      transition
      hover:bg-slate-50
    "
  >
    <Printer size={17} />
    Print Invoice
  </button>

</div>

      {/* =================================================
          INVOICE WRAPPER
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
            bg-[#164B84]
          "
        />

        {/* =================================================
            INVOICE CONTENT
        ================================================= */}

        <div className="flex min-h-[1040px] flex-col px-8 py-8 sm:px-12">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex items-start justify-between gap-6">

            {/* BRAND */}

            <div>
              <h1
                className="
                  text-2xl
                  font-extrabold
                  leading-[0.95]
                  tracking-tight
                  text-[#164B84]
                "
              >
                INPUTIFY
              </h1>

              <p className="mt-2 text-xs font-medium text-slate-500">
                Survey & Research Platform
              </p>
            </div>


            {/* INVOICE */}

            <div className="text-right">

              <h2
                className="
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-[#164B84]
                "
              >
                INVOICE
              </h2>

              <p className="mt-1 text-xs text-slate-500">
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

              <h3 className="text-sm font-semibold text-[#164B84]">
                Bill To:
              </h3>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {businessName}
              </p>

              <p className="text-sm text-slate-500">
                {businessAddress}
              </p>

            </div>


            {/* INVOICE DETAILS */}

            <div className="sm:text-right">

              <div className="grid grid-cols-[110px_1fr] gap-x-3 gap-y-1 text-sm sm:grid-cols-[auto_auto]">

                <span className="text-slate-500">
                  Invoice Number
                </span>

                <span className="font-medium text-slate-800">
                  {invoice.invoiceNumber}
                </span>

                <span className="text-slate-500">
                  Invoice Date
                </span>

                <span className="font-medium text-slate-800">
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

              <h3 className="text-sm font-semibold text-[#164B84]">
                Contact information
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Email: {businessContact}
              </p>

              <p className="text-sm text-slate-600">
                Phone: {businessPhone}
              </p>

            </div>


            {/* PAYMENT */}

            <div>

              <h3 className="text-sm font-semibold text-[#164B84]">
                Payment information
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Bank Name: {invoice.bankName || "—"}
              </p>

              <p className="text-sm text-slate-600">
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

                <tr
                  className="
                    border-y-2
                    border-[#164B84]
                  "
                >

                  <th className="py-2.5 text-left text-xs font-semibold text-slate-700">
                    Item Description
                  </th>

                  <th className="py-2.5 text-center text-xs font-semibold text-slate-700">
                    Quantity
                  </th>

                  <th className="py-2.5 text-right text-xs font-semibold text-slate-700">
                    Rate
                  </th>

                  <th className="py-2.5 text-right text-xs font-semibold text-slate-700">
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
                      Number(item.cpi || 0);

                    const itemTotal =
                      Number(item.totalCost || 0);

                    return (
                      <tr
                        key={
                          item.targetGroupId ||
                          index
                        }
                        className="
                          border-b
                          border-slate-100
                        "
                      >

                        <td className="py-3 text-sm text-slate-700">

                          <p className="font-medium text-slate-800">
                            {item.targetGroupName}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            Target Group
                          </p>

                        </td>


                        <td className="py-3 text-center text-sm text-slate-600">
                          {quantity}
                        </td>


                        <td className="py-3 text-right text-sm text-slate-600">
                          ${rate.toFixed(2)}
                        </td>


                        <td className="py-3 text-right text-sm font-medium text-slate-800">
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
          ================================================= */}

          <div className="mt-auto flex justify-end">

            <div className="w-full max-w-xs">

              <div className="flex justify-between text-sm text-slate-600">

                <span>
                  Subtotal:
                </span>

                <span className="font-medium text-slate-800">
                  ${subtotal.toFixed(2)}
                </span>

              </div>


              <div className="mt-2 flex justify-between text-sm text-slate-600">

                <span>
                  GST ({gstRate}%):
                </span>

                <span className="font-medium text-slate-800">
                  ${gstAmount.toFixed(2)}
                </span>

              </div>


              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  border-y-2
                  border-[#164B84]
                  py-2
                "
              >

                <span className="font-semibold text-slate-800">
                  Total Amount Due:
                </span>

                <span className="text-lg font-bold text-slate-900">
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

              <h3 className="text-sm font-semibold text-slate-700">
                Terms and Conditions
              </h3>

              <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
                Payment is due as per the agreed project
                terms. Please contact Inputify for any
                questions regarding this invoice.
              </p>

            </div>


            {/* SIGNATURE */}

            <div className="flex flex-col items-start sm:items-end">

              <p className="text-xs text-slate-500">
                Authorized Signatory
              </p>

              <p
                className="
                  mt-2
                  font-serif
                  text-xl
                  italic
                  text-[#164B84]
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
                text-[#164B84]
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
                Phone: {businessPhone}
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
            bg-[#164B84]
          "
        />

      </section>
    </>
  );
}