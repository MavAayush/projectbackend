const USER = require("../models/userSchema");

const authenticate = async(req, res, next) => {
    try {
        // Get clerkId from request headers
        const clerkId = req.headers.clerkid;
        
        if (!clerkId) {
            return res.status(401).send("Unauthorized: No Clerk ID provided");
        }
        
        // Find user by clerkId
        const rootUser = await USER.findOne({ clerkId: clerkId });
        
        if (!rootUser) {
            return res.status(401).send("Unauthorized: User not found");
        }
        
        // Set user data in request
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        
        next();
    } catch (error) {
        res.status(401).send("Unauthorized: Authentication failed");
        console.log(error);    
    }       
}

module.exports = authenticate;


