const mongoose = require("mongoose");
const { Schema } = mongoose;

const businessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  location: String,
  products: String,
  contactno: Number,
  email: String,
});

const Business = mongoose.model("Business", businessSchema);
module.exports = Business;
