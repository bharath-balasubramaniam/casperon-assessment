const express = require("express");
const router = express.Router();
const {
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  createCustomer,
} = require("../controllers/customerControllers");
const { ifAuth } = require("../middlewares/authMiddleware");

router.get("/", ifAuth, getAllCustomers);
router.get("/:id", ifAuth, getCustomer);
router.post("/", ifAuth, createCustomer);
router.put("/:id", ifAuth, updateCustomer);
router.delete("/:id", ifAuth, deleteCustomer);

module.exports = router;
