const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: String,
  invoiceNo: String,
  invoiceDate: Date,
  logo: String,
  upi: String,
  theme: String,
  billedBy: {
    businessName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
    state: String,
  },
  billedTo: {
    businessName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
    state: String,
  },
  items: [
    {
      itemName: String,
      quantity: Number,
      price: Number,
      gst: Number,
      cgst: Number,
      sgst: Number,
      total: Number,
    },
  ],
  totals: {
    totalPrice: Number,
    totalCgst: Number,
    totalSgst: Number,
    grandTotal: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = new mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
