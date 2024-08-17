const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    prescription: { type: Boolean, default: false }, // 0/1 for prescription requirement
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Foreign key reference to Product collection
    Id:{ type: String , required: true},
    deliveryDate: { type: String },
    sellerName: { type: String },
    shortDescription: { type: String },
    productInfo: { 
        contains: { type: String },
        uses: { type: String },
        sideEffects: { type: String },
        therapy: { type: String }
    },
    additionalInfo: {
        dosage: { type: String },
        storageAndDisposal: { type: String },
        directionsForUse: { type: String },
        contraindications: { type: String }
    } 
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
