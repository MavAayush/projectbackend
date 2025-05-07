require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
require("./db/conn");


const cookieParser = require("cookie-parser");
const Products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");


const orderRoutes = require("./routes/orderRoutes");





app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);


app.use(orderRoutes);





const razorpay = new Razorpay({
    key_id: 'rzp_test_OS7Xto3ROL3qvy',
    key_secret: 'oIhWW2FWBY2OR8f8wkPHLAeR',
  });

app.post("/order", async (req, res) => {
    const { amount, currency } = req.body;
    try {
      const order = await razorpay.orders.create({
        amount,
        currency,
        receipt: "receipt#1",
      });
      console.log(order);
      console.log(res.status)
      res.json(order); // send full Razorpay order object
    } catch (err) {
      res.status(500).send("Error creating order");
    }
  });
  





  const port = 8005;

  app.listen(port,()=>{
      console.log(`server is runnig on port number ${port}`);
  
  });




DefaultData();