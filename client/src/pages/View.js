import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import templates from "../utils/templates";
function InvoiceView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3005/api/invoice/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("No Data Found");
      });
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  const {
    invoiceNo,
    theme,
    invoiceDate,
    billedBy,
    billedTo,
    items,
    upi,
    totals,
  } = data;
  console.log(invoiceNo);
  const temp = templates[theme];

  return (
    <div className="container">
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
              <td>{totals.totalPrice?.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total CGST:</td>
              <td>{totals.totalCgst?.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total SGST:</td>
              <td>{totals.totalSgst?.toFixed(2)}</td>
            </tr>
            <tr style={{ background: temp.backgroundColor + "40" }}>
              <td>Grand Total:</td>
              <td>{totals.grandTotal?.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoiceView;
