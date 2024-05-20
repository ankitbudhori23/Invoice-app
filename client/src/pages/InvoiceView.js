import { useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import templates from "../utils/templates";
import { Button } from "../components/inputs";
function InvoiceView() {
  const location = useLocation();
  const {
    invoiceNo,
    theme,
    invoiceDate,
    billedBy,
    billedTo,
    items,
    upi,
    totals: { totalPrice, totalCgst, totalSgst, grandTotal },
  } = location.state.formData;
  const [selectedTemplate, setSelectedTemplate] = useState(theme);
  const id = location.state.id;

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
    fetch(`https://invoice-app-steel-seven.vercel.app/api/invoice/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        theme: event.target.value,
      }),
    });
  };
  const handleShare = () => {
    const invoiceDetails = `http://localhost:3000/share/${id}`;
    navigator.clipboard
      .writeText(invoiceDetails)
      .then(() => {
        alert("Invoice details copied");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const temp = templates[selectedTemplate];
  return (
    <div className="container">
      <div className="template-dropdown">
        <Button onClick={handleShare} name="Share" icon="share-alt" />
        <div>
          <label htmlFor="template-select">Select Template:</label>
          <select
            id="template-select"
            className="template-select"
            value={selectedTemplate}
            onChange={handleTemplateChange}
          >
            {Object.keys(templates).map((template) => (
              <option key={template} value={template}>
                {template}
              </option>
            ))}
          </select>
          <div className="select-arrow"></div>
        </div>
      </div>
      <table className="invoice">
        <thead>
          <tr>
            <th colSpan="4" style={{ background: temp.backgroundColor }}>
              Invoice
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ background: temp.backgroundColor + "40" }}>
            <td>
              <b>Invoice No:</b> {invoiceNo}
            </td>

            <td>
              <b>Invoice Date:</b> {invoiceDate?.split("T")[0].replace(10)}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="invoice-details">
        <thead>
          <tr style={{ background: temp.backgroundColor }}>
            <th colSpan="2">Billed By</th>
            <th colSpan="2">Billed To</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ background: temp.backgroundColor + "40" }}>
            <td colSpan="2">
              <p>Business Name - {billedBy.businessName}</p>
              <p>Email - {billedBy.email}</p>
              <p>Phone - {billedBy.phone}</p>
              <p>Address - {billedBy.address}</p>
              <p>City - {billedBy.city}</p>
              <p>State - {billedBy.state}</p>
              <p>ZIP Code - {billedBy.postalCode}</p>
            </td>
            <td colSpan="2">
              <p>Business Name - {billedTo.businessName}</p>
              <p>Email - {billedTo.email}</p>
              <p>Phone - {billedTo.phone}</p>
              <p>Address - {billedTo.address}</p>
              <p>City - {billedTo.city}</p>
              <p>State - {billedTo.state}</p>
              <p>ZIP Code - {billedTo.postalCode}</p>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="invoice-items">
        <thead>
          <tr style={{ background: temp.backgroundColor }}>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>GST</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} style={{ background: temp.backgroundColor + "40" }}>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.gst}%</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="totals-container">
        <div className="qr-code">
          <b>UPI- Scan to Pay</b>
          <QRCode value={upi || ""} size={150} />
          <b>{upi}</b>
        </div>
        <table className="invoice-totals">
          <tbody>
            <tr>
              <td>Total Price:</td>
              <td>{totalPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total CGST:</td>
              <td>{totalCgst.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total SGST:</td>
              <td>{totalSgst.toFixed(2)}</td>
            </tr>
            <tr style={{ background: temp.backgroundColor + "40" }}>
              <td>Grand Total:</td>
              <td>{grandTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoiceView;
