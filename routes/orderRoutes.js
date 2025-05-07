const express = require("express");
const router = new express.Router();
const Order = require("../models/orderSchema");
const User = require("../models/userSchema");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Email configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Place a new order
router.post("/placeorder", authenticate, async (req, res) => {
    try {
        const { items, totalAmount, customerDetails, paymentMethod, orderStatus } = req.body;

        if (!items || !totalAmount || !customerDetails) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const order = new Order({
            user: req.userID,
            items,
            totalAmount,
            customerDetails,
            paymentMethod: paymentMethod || 'Cash on Delivery',
            orderStatus: orderStatus || 'Pending'
        });

        const savedOrder = await order.save();

        // Clear cart after successful order
        const user = await User.findById(req.userID);
        user.carts = [];
        await user.save();

        // Send email to store owner with order details
        const userInfo = await User.findById(req.userID);
        
        // Create items list for email
        let itemsList = '';
        items.forEach(item => {
            itemsList += `
                <tr>
                    <td>${item.title.shortTitle}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price.cost}</td>
                    <td>₹${item.price.cost * item.quantity}</td>
                </tr>`;
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.OWNER_EMAIL,
            subject: `New Order #${savedOrder._id}`,
            html: `
                <h2>New Order Received</h2>
                <p><strong>Order ID:</strong> ${savedOrder._id}</p>
                <p><strong>Date:</strong> ${new Date(savedOrder.orderDate).toLocaleString()}</p>
                <p><strong>Payment Method:</strong> ${savedOrder.paymentMethod}</p>
                <p><strong>Total Amount:</strong> ₹${savedOrder.totalAmount}</p>
                
                <h3>Customer Details:</h3>
                <p><strong>Name:</strong> ${customerDetails.name}</p>
                <p><strong>Email:</strong> ${userInfo.email}</p>
                <p><strong>Phone:</strong> ${customerDetails.phone}</p>
                <p><strong>Address:</strong> ${customerDetails.address}, ${customerDetails.city}, ${customerDetails.state} - ${customerDetails.pincode}</p>
                
                <h3>Order Items:</h3>
                <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
                    <tr style="background-color: #f2f2f2;">
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                    ${itemsList}
                    <tr style="font-weight: bold;">
                        <td colspan="3" align="right">Total:</td>
                        <td>₹${savedOrder.totalAmount}</td>
                    </tr>
                </table>
            `
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending order notification:", error);
            } else {
                console.log("Order notification sent:", info.response);
            }
        });

        res.status(201).json({ 
            message: "Order placed successfully",
            order: savedOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Get orders for authenticated user
router.get("/myorders", authenticate, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userID }).sort({ orderDate: -1 });
        
        if (!orders.length) {
            return res.status(200).json({ message: "No orders found" });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Get order by ID
router.get("/order/:id", authenticate, async (req, res) => {
    try {
        const order = await Order.findOne({ 
            _id: req.params.id,
            user: req.userID
        });
        
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json({ order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;