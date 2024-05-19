import React, { useState } from "react";
import { Button, TextInput } from "../components/inputs";
import FormComponent from "../layout/form";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

function Invoice() {
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    userId: id,
    invoiceNo: "",
    invoiceDate: "",
    logo: null,
    upi: "",
    theme: "Basic",
    billedBy: {
      businessName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
    },
    billedTo: {
      businessName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
    },
    items: [
      {
        itemName: "",
        quantity: 1,
        price: 0,
        gst: 18,
        cgst: 0,
        sgst: 0,
        total: 0,
      },
    ],
    totals: {
      totalPrice: 0,
      totalCgst: 0,
      totalSgst: 0,
      grandTotal: 0,
    },
  });
  const [errors, setErrors] = useState({});
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...formData.items];

    if (name === "gst") {
      const gst = parseFloat(value) || 0;
      const price = parseFloat(newItems[index]["price"]) || 0;
      const quantity = parseFloat(newItems[index]["quantity"]) || 1;
      const cgstSgst = (price * quantity * gst) / 100;
      newItems[index]["cgst"] = cgstSgst / 2;
      newItems[index]["sgst"] = cgstSgst / 2;
      newItems[index]["total"] = price * quantity + cgstSgst;
    }

    if (name === "quantity") {
      const quantity = parseFloat(value) || 1;
      const gst = parseFloat(newItems[index]["gst"]) || 0;
      const price = parseFloat(newItems[index]["price"]) || 0;
      const cgstSgst = (price * quantity * gst) / 100;
      newItems[index]["cgst"] = cgstSgst / 2;
      newItems[index]["sgst"] = cgstSgst / 2;
      newItems[index]["total"] = price * quantity + cgstSgst;
    }

    if (name === "price") {
      const price = parseFloat(value) || 0;
      const gst = parseFloat(newItems[index]["gst"]) || 0;
      const quantity = parseFloat(newItems[index]["quantity"]) || 1;
      const cgstSgst = (price * quantity * gst) / 100;
      newItems[index]["cgst"] = cgstSgst / 2;
      newItems[index]["sgst"] = cgstSgst / 2;
      newItems[index]["total"] = price * quantity + cgstSgst;
    }

    newItems[index][name] = value;
    let totalPrice = 0;
    let totalCgst = 0;
    let totalSgst = 0;
    let grandTotal = 0;

    formData.items.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalCgst += item.cgst;
      totalSgst += item.sgst;
      grandTotal += item.total;
    });
    setFormData({
      ...formData,
      items: newItems,
      totals: {
        totalPrice,
        totalCgst,
        totalSgst,
        grandTotal,
      },
    });
  };

  const handleAddRow = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          itemName: "",
          quantity: 1,
          price: 0,
          gst: 18,
          cgst: 0,
          sgst: 0,
          total: 0,
        },
      ],
    });
  };

  const handleDeleteRow = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logo: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const validateInvoiceNo = (invoiceNo) => {
    return invoiceNo.trim() !== "";
  };

  const validateInvoiceDate = (invoiceDate) => {
    return invoiceDate.trim() !== "";
  };
  const upirequired = (upi) => {
    return upi.trim() !== "";
  };
  const validateBilledInfo = (billedInfo) => {
    return (
      billedInfo.businessName.trim() !== "" &&
      billedInfo.email.trim() !== "" &&
      billedInfo.phone.trim() !== "" &&
      billedInfo.address.trim() !== "" &&
      billedInfo.city.trim() !== "" &&
      billedInfo.postalCode.trim() !== "" &&
      billedInfo.state.trim() !== ""
    );
  };
  const handleSubmit = async () => {
    const newErrors = {};

    if (!validateInvoiceNo(formData.invoiceNo)) {
      newErrors.invoiceNo = "Invoice number is required.";
    }

    if (!validateInvoiceDate(formData.invoiceDate)) {
      newErrors.invoiceDate = "Invoice date is required.";
    }

    if (!validateBilledInfo(formData.billedBy)) {
      newErrors.billedBy = "All fields in Billed By are required.";
    }

    if (!validateBilledInfo(formData.billedTo)) {
      newErrors.billedTo = "All fields in Billed To are required.";
    }
    if (!upirequired(formData.upi)) {
      newErrors.upi = "UPI is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      const response = await fetch("http://localhost:3005/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        const { id } = await response.json();
        navigate("/invoice-preview", { state: { formData, id } });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container">
      <h1 className="heading">Invoice</h1>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: "1", marginRight: "20px" }}>
            <TextInput
              label="Invoice No"
              name="invoiceNo"
              type="number"
              value={formData.invoiceNo}
              error={errors.invoiceNo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  invoiceNo: e.target.value,
                })
              }
            />
            <label>Invoice Date:</label>
            <input
              type="date"
              value={formData.invoiceDate}
              error={errors.invoiceDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  invoiceDate: e.target.value,
                })
              }
            />
            <div className="error">{errors.invoiceDate}</div>
          </div>
          <div className="img-container">
            <div>
              <label className="input-label">Upload Logo:</label>
              <input type="file" accept="image/*" onChange={handleLogoChange} />
            </div>
            {formData.logo && (
              <div className="uploaded-logo">
                <img
                  src={formData.logo}
                  alt="Uploaded Logo"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div style={{ flex: "1", marginRight: "20px" }}>
            <h3>Billed By</h3>
            <FormComponent
              formData={formData.billedBy}
              error={errors.billedBy}
              setFormData={(data) =>
                setFormData({
                  ...formData,
                  billedBy: data,
                })
              }
            />
          </div>
          <div style={{ flex: "1" }}>
            <h3>Billed To</h3>
            <FormComponent
              error={errors.billedTo}
              formData={formData.billedTo}
              setFormData={(data) =>
                setFormData({
                  ...formData,
                  billedTo: data,
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>GST (%)</th>
              <th>CGST</th>
              <th>SGST</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="itemName"
                    value={item.itemName}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="gst"
                    value={item.gst}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input type="number" name="cgst" value={item.cgst} readOnly />
                </td>
                <td>
                  <input type="number" name="sgst" value={item.sgst} readOnly />
                </td>
                <td>
                  <input
                    type="number"
                    name="total"
                    value={item.total}
                    readOnly
                  />
                </td>
                <td>
                  <Button
                    icon="trash"
                    onClick={() => handleDeleteRow(index)}
                    color="#f12c2c"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Button icon="plus" name="Add Item" onClick={handleAddRow} />
      </div>
      <div className="totals-container">
        <div className="qr-code">
          {formData.upi !== "" && (
            <>
              <div className="upi-text">UPI - Scan to Pay</div>
              <QRCode value={formData.upi} size={150} />
            </>
          )}

          <TextInput
            label="Enter UPI ID"
            name="upi"
            error={errors.upi}
            value={formData.upi}
            onChange={(e) => setFormData({ ...formData, upi: e.target.value })}
          />
        </div>
        <table>
          <tbody>
            <tr>
              <th>Total Price</th>
              <td>{formData.totals.totalPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Total CGST</th>
              <td>{formData.totals.totalCgst.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Total SGST</th>
              <td>{formData.totals.totalSgst.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Grand Total</th>
              <td>{formData.totals.grandTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="save-continue">
        <Button name="save & continue" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Invoice;
