const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
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