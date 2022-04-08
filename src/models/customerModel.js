const mongoose = require("mongoose");
const customerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: Number, required: true },
    status: {
      type: String,
      enum: ["enquired", "pending", "resolved"],
      default: "enquired",
    },
    remarks: { type: String },
  },
  {
    timeStamps: true,
  }
);
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
