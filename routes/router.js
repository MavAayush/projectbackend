const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const secretkey = process.env.KEY;



//email config
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"keshritobacco.store@gmail.com",
        pass:"sjjc pnew mhqn udjc"
    }
});



//get productsdata api
router.get("/getproducts",async(req,res)=>{
    try{
        const productsdata = await Products.find();
        // console.log("console the data" + productsdata);
        res.status(201).json(productsdata);
    }catch(error){
        console.log("error"+error.message);
    }
});



//get individual data
router.get("/getproductsone/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const individualdata = await Products.findOne({id:id});
        // console.log(individualdata + "individual data");
        res.status(201).json(individualdata);
    }catch(error){
        res.status(400).json(individualdata);
        console.log("error" + error.message);
    }
});




// Register data
router.post("/register",async(req,res)=>{
    // console.log(req.body);
    const {fname,email,mobile,password,cpassword} = req.body;
    if(!fname || !email || !mobile || !password || !cpassword){
        return res.status(422).json({error:"Please fill all the fields"});
        console.log("No data available");
    };
    

    try{
        const preuser = await USER.findOne({email:email});
        if(preuser){
            return res.status(422).json({error:"User already exist"})
        }else if(password !== cpassword){
            return res.status(422).json({error:"Password not matching"})
        }else{
            const finalUser = new USER({
                fname,email,mobile,password,cpassword
            });
            const storedata = await finalUser.save();
            console.log(storedata);

            res.status(201).json(storedata);
        }
    }catch(error){
        console.log("error"+error.message);
    }
});




// Login user api
router.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({error:"Please fill all the fields"});
    };
    try{
        const userlogin = await USER.findOne({email:email});
        if(userlogin){
            const isMatch = await bcrypt.compare(password,userlogin.password);
            console.log(isMatch + "pass match");

            // token generate
            const token = await userlogin.generateAuthtoken();
            // console.log(token);
            res.cookie("KeshriWeb",token,{
                expires:new Date(Date.now() + 3600000),
                httpOnly:true
            });

            if(!isMatch){
                res.status(400).json({error:"Invalid details"});
            }else{
                res.status(201).json(userlogin);
            }
        }else{
            res.status(400).json({error:"Invalid details"});
        }
    }
    catch(error){
        res.status(400).json({error:"Invalid details"});
    }
})



//adding data to cart
router.post("/addcart/:id",authenticate,async(req,res)=>{
    try{
        const {id} = req.params;
        const cart = await Products.findOne({id:id});
        // console.log(cart + "cart data");

        const UserContact = await USER.findOne({_id:req.userID});
        // console.log(UserContact);

        if(UserContact){
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            // console.log(cartData);
            res.status(201).json(UserContact);
        }else{
            res.status(401).json({error:"User not found"});
        }

    }catch(error){
        res.status(401).json({error:"User not found"});
    }
});


// get cart details
router.get("/cartdetails",authenticate,async(req,res)=>{
    try{
        const buyuser = await USER.findOne({_id:req.userID});
        res.status(201).json(buyuser);
    }catch(error){
        console.log("error" + error);
    }
});



// get valid user
router.get("/validuser",authenticate,async(req,res)=>{
    try{
        const validuserone = await USER.findOne({_id:req.userID});
        res.status(201).json(validuserone);
    }catch(error){
        console.log("error" + error);
    }
});


//remove item from cart
router.delete ("/remove/:id",authenticate,async(req,res)=>{
    try{
        const {id} = req.params;
        req.rootUser.carts = req.rootUser.carts.filter((cruval)=>{
            return cruval.id !== id;
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("Item removed");
    }catch(error){
        console.log("error" + error);
        res.status(400).json(req.rootUser);
    }
})


// for user logout
router.get("/lougout",authenticate,(req,res)=>{
    try{
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token;
        });
        res.clearCookie("KeshriWeb",{path:"/"});
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("User Logout")
    }catch(error){
        console.log("error for user logout");
    }
});


//send email link for reset password
router.post("/sendpasswordlink",async(req,res)=>{
    console.log(req.body);

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"});   
    }

    try{
        const userfind = await USER.findOne({email:email});

        //token generate for reset password
        const token = jwt.sign({_id:userfind._id},secretkey,{
            expiresIn:"300s"
        });
        console.log("token",token);

        const setusertoken = await USER.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
        
        if(setusertoken){
            const mailOptions = {
                from:"keshritobacco.store@gmail.com",
                to:email,
                subject:"Email For Password Reset",
                text:`This Link Valid for 5 MINUTES http://localhost:3000/forgotpassword/${userfind._id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"Email Not Sent"});
                }else{
                    console.log("Email Sent", info.response);
                    res.status(201).json({status:201,message:"Email Sent Successfully"});
                }
            })
        }

    }catch(error){
        res.status(401).json({status:401,message:"Invalid User"});
    }

});


//verify user for forgot password
router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    try{
        const validuser = await USER.findOne({_id:id,verifytoken:token});

        const verifyToken = jwt.verify(token,secretkey);

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser});
        }else{
            res.status(401).json({status:401,message:"User Not Found"});
        }

 
    }catch(error){
        res.status(401).json({status:401,error});
    }
});


//change password
router.post("/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try{
        const validuser = await USER.findOne({_id:id,verifytoken:token});

        const verifyToken = jwt.verify(token,secretkey);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);

            const setnewuserpass = await USER.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass});

        }else{
            res.status(401).json({status:401,message:"User Not Found"});
        }

    }catch(error){
        res.status(401).json({status:401,error});
    }

})


// Update the login route
router.post("/register-clerk-user", async(req, res) => {
    console.log("Received register-clerk-user request with data:", req.body);
    const { clerkId, email, mobile } = req.body;

    if(!clerkId){
        console.log("No clerkId provided in request");
        return res.status(400).json({error:"Please provide Clerk ID"});
    };

    try {
        console.log("Looking for existing user with clerkId:", clerkId);
        const preuser = await USER.findOne({clerkId: clerkId});
        
        if(preuser){
            console.log("User found with clerkId:", clerkId);
            return res.status(201).json(preuser); // User already exists
        } else {
            console.log("Creating new user with clerkId:", clerkId);
            
            // Generate a unique email if not provided to avoid the duplicate key error
            const uniqueEmail = email || `${clerkId}@clerk.user`;
            
            const newuser = new USER({
                clerkId,
                email: uniqueEmail,
                mobile: mobile || `${clerkId.substring(0, 10)}`,
                carts: []
            });

            const storedata = await newuser.save();
            console.log("New user created:", storedata);
            return res.status(201).json(storedata);
        }
    } catch(error) {
        console.error("Error registering clerk user:", error);
        return res.status(400).json({error:"Invalid details", details: error.message});
    }
});

// Get user data by clerkId
router.get("/get-user-by-clerk", async(req, res) => {
    try {
        const clerkId = req.headers.clerkid;
        console.log("Received get-user-by-clerk request with clerkId:", clerkId);

        if(!clerkId) {
            console.log("No clerkId provided in headers");
            return res.status(400).json({error:"No Clerk ID provided"});
        }
        
        const userData = await USER.findOne({clerkId: clerkId});
        
        if(!userData) {
            console.log("No user found with clerkId:", clerkId);
            return res.status(404).json({error:"User not found"});
        }
        
        console.log("User found:", userData);
        res.status(200).json(userData);
    } catch(error) {
        console.error("Error finding clerk user:", error);
        res.status(500).json({error:"Server error", details: error.message});
    }
});

// Clear user's cart 
router.post("/clearcart", authenticate, async(req, res) => {
    try {
        // Get user from authentication middleware
        const user = req.rootUser;
        
        // Clear the cart
        user.carts = [];
        await user.save();
        
        res.status(200).json({ 
            success: true, 
            message: "Cart cleared successfully" 
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ 
            success: false, 
            error: "Failed to clear cart" 
        });
    }
});


module.exports = router;

