const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    items: [{
        id: String,
        title: {
            shortTitle: String,
            longTitle: String
        },
        price: {
            mrp: Number,
            cost: Number,
            discount: String
        },
        quantity: {
            type: Number,
            default: 1
        },
        url: String
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    customerDetails: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        default: 'Cash on Delivery'
    },
    orderStatus: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const ORDER = new mongoose.model("ORDER", orderSchema);

module.exports = ORDER; 