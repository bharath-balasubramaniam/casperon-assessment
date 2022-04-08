const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel");

//get All customers
const getAllCustomers = asyncHandler(async (req, res) => {
  const qStatus = req.query.status;
  let customers;
  try {
    if (qStatus) {
      customers = await Customer.find({ status: qStatus });
      return res.status(200).json(customers);
    } else {
      customers = await Customer.find({});
      return res.status(200).json(customers);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//get a customer
const getCustomer = asyncHandler(async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).select("-password");
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
// create a customer
const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, contact, remarks } = req.body;
  try {
    if (!name || !email || !contact) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }
    // check if customer exist
    const customer = await Customer.findOne({ email });
    if (customer) {
      res.status(400);
      throw new Error("This Customer already exist");
    }
    let newCus = await Customer.create({
      name,
      email,
      contact,
      remarks,
    });
    return res.status(201).json(newCus);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//update a customer
const updateCustomer = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body;
  try {
    let customer = await Customer.findByIdAndUpdate(req.params.id, {
      status,
      remarks,
    });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//delete a customer
const deleteCustomer = asyncHandler(async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(204).json("Customer has been deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
