const Invoice = require("../models/invoice-model");

const create = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.status(201).json({ id: newInvoice._id });
  } catch (error) {
    res.json({ error: error.message });
    throw error;
  }
};

const getAllById = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    if (!invoices) return res.status(404).send("No invoice found");
    res.status(200).json(invoices);
  } catch (error) {
    res.json({ error: error.message });
    throw error;
  }
};

const update = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "invoice updated successfully" });
  } catch (error) {
    res.json({ error: error.message });
    throw error;
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "invoice deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
    throw error;
  }
};

const getById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).send("No invoice found");
    res.status(200).json({ data: invoice });
  } catch (error) {
    res.json({ error: error.message });
    throw error;
  }
};

module.exports = { create, getAllById, update, deleteInvoice, getById };
