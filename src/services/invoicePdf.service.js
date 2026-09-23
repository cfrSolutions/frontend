import puppeteer from "puppeteer";

/* =====================================================
   HELPERS
===================================================== */

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatCurrency(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* =====================================================
   GENERATE PDF
===================================================== */

export async function generateInvoicePdf(invoice, project) {
  const businessName =
    project?.business?.company ||
    project?.business?.name ||
    project?.company ||
    "Business Name";

  const businessEmail =
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

  const subtotal = Number(invoice.subtotal || 0);

  const gstRate = Number(invoice.gstRate || 0);

  const gstAmount =
    invoice.gstAmount !== undefined
      ? Number(invoice.gstAmount || 0)
      : subtotal * (gstRate / 100);

  const total =
    invoice.total !== undefined
      ? Number(invoice.total || 0)
      : subtotal + gstAmount;

  const items = Array.isArray(invoice.items)
    ? invoice.items
    : [];

  const itemRows = items
    .map((item) => {
      const quantity = Number(
        item.targetCompletes || 0
      );

      const rate = Number(item.cpi || 0);

      const itemTotal = Number(
        item.totalCost || 0
      );

      return `
        <tr>
          <td>
            <div class="item-name">
              ${escapeHtml(item.targetGroupName)}
            </div>

            <div class="item-type">
              Target Group
            </div>
          </td>

          <td class="center">
            ${quantity}
          </td>

          <td class="right">
            ${formatCurrency(rate)}
          </td>

          <td class="right strong">
            ${formatCurrency(itemTotal)}
          </td>
        </tr>
      `;
    })
    .join("");

  const html = `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8" />

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<style>

@page {
  size: A4;
  margin: 0;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  background: #ffffff;
  color: #1E293B;

  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.invoice {
  width: 210mm;
  min-height: 297mm;

  background: #ffffff;

  display: flex;
  flex-direction: column;
}

.blue-bar {
  width: 100%;
  height: 10mm;

  flex-shrink: 0;

  background: #164B84;
}

.content {
  min-height: 277mm;

  padding:
    12mm
    13mm
    10mm;

  display: flex;
  flex-direction: column;
}

/* ================= HEADER ================= */

.header {
  display: flex;

  align-items: flex-start;
  justify-content: space-between;
}

.brand {
  margin: 0;

  color: #164B84;

  font-size: 24px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.5px;
}

.brand-subtitle {
  margin-top: 6px;

  color: #64748B;

  font-size: 9px;
  font-weight: 500;
}

.invoice-heading {
  text-align: right;
}

.invoice-heading h1 {
  margin: 0;

  color: #164B84;

  font-size: 29px;
  font-weight: 800;
  line-height: 1;
}

.invoice-heading p {
  margin: 6px 0 0;

  color: #64748B;

  font-size: 9px;
}

/* ================= BILLING ================= */

.billing {
  margin-top: 27px;

  display: grid;

  grid-template-columns:
    1fr
    1fr;

  gap: 30px;
}

.section-title {
  margin: 0 0 5px;

  color: #164B84;

  font-size: 10px;
  font-weight: 700;
}

.business-name {
  margin: 0;

  color: #1E293B;

  font-size: 11px;
  font-weight: 700;
}

.normal-text {
  margin: 3px 0 0;

  color: #64748B;

  font-size: 9px;
  line-height: 1.5;
}

.invoice-details {
  text-align: right;
}

.detail-row {
  margin-bottom: 4px;

  display: flex;

  justify-content: flex-end;

  gap: 15px;

  font-size: 9px;
}

.detail-label {
  color: #64748B;
}

.detail-value {
  min-width: 90px;

  color: #475569;

  font-weight: 600;
}

/* ================= CONTACT ================= */

.contact-section {
  margin-top: 22px;

  display: grid;

  grid-template-columns:
    1fr
    1fr;

  gap: 30px;
}

.contact-line {
  margin-top: 4px;

  color: #475569;

  font-size: 9px;
}

/* ================= TABLE ================= */

.table-wrapper {
  margin-top: 27px;
}

table {
  width: 100%;

  border-collapse: collapse;
}

thead {
  display: table-header-group;
}

tr {
  break-inside: avoid;
  page-break-inside: avoid;
}

thead tr {
  border-top:
    2px solid #164B84;

  border-bottom:
    2px solid #164B84;
}

th {
  padding:
    8px
    0;

  color: #334155;

  font-size: 9px;
  font-weight: 700;

  text-align: left;
}

td {
  padding:
    10px
    0;

  border-bottom:
    1px solid #F1F5F9;

  color: #475569;

  font-size: 9px;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}

.strong {
  color: #1E293B;

  font-weight: 700;
}

.item-name {
  color: #1E293B;

  font-weight: 600;
}

.item-type {
  margin-top: 3px;

  color: #94A3B8;

  font-size: 8px;
}

/* ================= TOTAL ================= */

.total-container {
  margin-top: auto;

  padding-top: 25px;

  display: flex;

  justify-content: flex-end;
}

.total-box {
  width: 75mm;
}

.total-row {
  margin-bottom: 8px;

  display: flex;

  justify-content: space-between;

  color: #475569;

  font-size: 10px;
}

.total-row-value {
  color: #1E293B;

  font-weight: 600;
}

.grand-total {
  margin-top: 10px;

  padding:
    8px
    0;

  border-top:
    2px solid #164B84;

  border-bottom:
    2px solid #164B84;

  display: flex;

  align-items: center;
  justify-content: space-between;
}

.grand-total-label {
  color: #1E293B;

  font-size: 10px;
  font-weight: 700;
}

.grand-total-value {
  color: #0F172A;

  font-size: 16px;
  font-weight: 800;
}

/* ================= TERMS ================= */

.bottom-information {
  margin-top: 24px;

  display: grid;

  grid-template-columns:
    1fr
    1fr;

  gap: 30px;
}

.terms-title {
  color: #334155;

  font-size: 9px;
  font-weight: 700;
}

.terms-text {
  margin-top: 5px;

  max-width: 100mm;

  color: #64748B;

  font-size: 8px;
  line-height: 1.5;
}

.signature {
  text-align: right;
}

.signature-label {
  color: #64748B;

  font-size: 8px;
}

.signature-name {
  margin-top: 7px;

  color: #164B84;

  font-family:
    Georgia,
    serif;

  font-size: 17px;
  font-style: italic;
}

/* ================= FOOTER ================= */

.footer {
  margin-top: 21px;

  padding:
    8px
    0;

  border-top:
    2px solid #164B84;

  border-bottom:
    2px solid #164B84;

  display: flex;

  justify-content: space-between;

  color: #164B84;

  font-size: 8px;
}

/* ================= MULTI PAGE ================= */

@media print {

  .invoice {
    margin: 0;
  }

  .table-wrapper {
    break-inside: auto;
  }

  tr {
    break-inside: avoid;
  }
}

</style>

</head>

<body>

<div class="invoice">

  <div class="blue-bar"></div>

  <div class="content">

    <!-- HEADER -->

    <div class="header">

      <div>

        <h1 class="brand">
          INPUTIFY
        </h1>

        <div class="brand-subtitle">
          Survey & Research Platform
        </div>

      </div>

      <div class="invoice-heading">

        <h1>
          INVOICE
        </h1>

        <p>
          GSTIN:
          ${escapeHtml(
            invoice.gstin || "—"
          )}
        </p>

      </div>

    </div>


    <!-- BILLING -->

    <div class="billing">

      <div>

        <div class="section-title">
          Bill To:
        </div>

        <p class="business-name">
          ${escapeHtml(businessName)}
        </p>

        <p class="normal-text">
          ${escapeHtml(businessAddress)}
        </p>

      </div>


      <div class="invoice-details">

        <div class="detail-row">

          <span class="detail-label">
            Invoice Number
          </span>

          <span class="detail-value">
            ${escapeHtml(
              invoice.invoiceNumber
            )}
          </span>

        </div>


        <div class="detail-row">

          <span class="detail-label">
            Invoice Date
          </span>

          <span class="detail-value">
            ${formatDate(
              invoice.issuedAt
            )}
          </span>

        </div>

      </div>

    </div>


    <!-- CONTACT / PAYMENT -->

    <div class="contact-section">

      <div>

        <div class="section-title">
          Contact information
        </div>

        <div class="contact-line">
          Email:
          ${escapeHtml(
            businessEmail
          )}
        </div>

        <div class="contact-line">
          Phone:
          ${escapeHtml(
            businessPhone
          )}
        </div>

      </div>


      <div>

        <div class="section-title">
          Payment information
        </div>

        <div class="contact-line">
          Bank Name:
          ${escapeHtml(
            invoice.bankName || "—"
          )}
        </div>

        <div class="contact-line">
          Account Number:
          ${escapeHtml(
            invoice.accountNumber || "—"
          )}
        </div>

      </div>

    </div>


    <!-- ITEMS -->

    <div class="table-wrapper">

      <table>

        <thead>

          <tr>

            <th>
              Item Description
            </th>

            <th class="center">
              Quantity
            </th>

            <th class="right">
              Rate
            </th>

            <th class="right">
              Total
            </th>

          </tr>

        </thead>

        <tbody>
          ${itemRows}
        </tbody>

      </table>

    </div>


    <!-- TOTAL -->

    <div class="total-container">

      <div class="total-box">

        <div class="total-row">

          <span>
            Subtotal:
          </span>

          <span class="total-row-value">
            ${formatCurrency(
              subtotal
            )}
          </span>

        </div>


        <div class="total-row">

          <span>
            GST (${gstRate}%):
          </span>

          <span class="total-row-value">
            ${formatCurrency(
              gstAmount
            )}
          </span>

        </div>


        <div class="grand-total">

          <span class="grand-total-label">
            Total Amount Due:
          </span>

          <span class="grand-total-value">
            ${formatCurrency(
              total
            )}
          </span>

        </div>

      </div>

    </div>


    <!-- TERMS -->

    <div class="bottom-information">

      <div>

        <div class="terms-title">
          Terms and Conditions
        </div>

        <div class="terms-text">
          Payment is due as per the agreed project
          terms. Please contact Inputify for any
          questions regarding this invoice.
        </div>

      </div>


      <div class="signature">

        <div class="signature-label">
          Authorized Signatory
        </div>

        <div class="signature-name">
          Inputify
        </div>

      </div>

    </div>


    <!-- FOOTER -->

    <div class="footer">

      <span>
        hello@inputify.io
      </span>

      <span>
        inputify.io
      </span>

      <span>
        Phone:
        ${escapeHtml(
          businessPhone
        )}
      </span>

    </div>

  </div>

  <div class="blue-bar"></div>

</div>

</body>

</html>
`;

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,

      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page =
      await browser.newPage();

    await page.setContent(
      html,
      {
        waitUntil: "networkidle0",
      }
    );

    await page.emulateMediaType(
      "print"
    );

    const pdfBuffer =
      await page.pdf({
        format: "A4",

        printBackground: true,

        preferCSSPageSize: true,

        margin: {
          top: "0mm",
          right: "0mm",
          bottom: "0mm",
          left: "0mm",
        },
      });

    return pdfBuffer;

  } finally {

    if (browser) {
      await browser.close();
    }
  }
}