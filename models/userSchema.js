const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true // This allows null/undefined values and only enforces uniqueness for non-null values
    },
    mobile: {
        type: String,
        unique: true,
        sparse: true // This allows null/undefined values and only enforces uniqueness for non-null values
    },
    carts: Array
});

//add to cart data
userSchema.methods.addcartdata = async function(cart) {
    try {        
        this.carts = this.carts.concat(cart);
        await this.save();
        return this.carts;
    } catch(error) {  
        console.log(error);
    }
}

const USER = new mongoose.model("USER", userSchema);

module.exports = USER; 