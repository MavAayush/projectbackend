const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address")
            }
        }
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        maxlenght:10
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:false,
        minlenght:6
    },
    cpassword:{
        type:String,
        required:false,
        minlenght:6 
    },
    carts : Array
});

userSchema.pre("save",async function(next){
    if(this.password && this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12); 
    }
    next();
});

//add to cart data
userSchema.methods.addcartdata = async function(cart){
    try{        
        this.carts = this.carts.concat(cart);
        await this.save();
        return this.carts;
    }catch(error){  
        console.log(error);
    }
}

const USER = new mongoose.model("USER",userSchema);

module.exports = USER;