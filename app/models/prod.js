const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    origPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    category: { type: String, required: true },
    imageLink: { type: String, required: true },
      id:{type: Number, required: true }
});

// Create the product model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
