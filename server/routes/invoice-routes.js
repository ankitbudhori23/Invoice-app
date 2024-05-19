const express = require("express");
const router = express.Router();
const invoice = require("../controllers/invoice-controllers");

router.route("/").post(invoice.create);

router
  .route("/:id")
  .put(invoice.update)
  .delete(invoice.deleteInvoice)
  .get(invoice.getById);

router.route("/findAll/:id").get(invoice.getAllById);
module.exports = router;
