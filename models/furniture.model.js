const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, },
    ratings: { type: Number, default: 4 },
    category: { type: String, required: true },
    color: [{ type: String }], // Changed to array
    sizes: [{ type: String }], // Changed to array
    additionalImages: [{ type: String }], // New field for additional images
    brandName: { type: String, required: true }, // New field for brand name
    originalPrice: { type: Number },
    isNew: { type: Boolean },
    salePercentage: { type: Number },

});

const furnitureModel = mongoose.model('Furniture', furnitureSchema);
module.exports = furnitureModel;