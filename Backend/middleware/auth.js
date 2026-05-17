const supabase = require("../config/supabase");
const User  = require("../models/User");

const  authMiddleware = async (req,res,next)=>{
    try {
        const token  = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"no token access"});
        }
        const {data,error} = await supabase.auth.getUser(token);
        if(error || !data.user){
            return res.status(401).json({message:"unauthorized invalid token "});
        }
        
        const userDB = await User.findOne({email:data.user.email});
        if(!userDB){
            return res.status(401).json({message:"user not found"});
        }


        req.user = data.user
        req.userDB = userDB
        next()
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


module.exports = authMiddleware