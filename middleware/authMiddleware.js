import jwt from "jsonwebtoken"

import AsyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";




const protect = AsyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ){
        try{
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            // Get admin from the token 
            req.user = await Admin.findById(decoded.id).select('-password')
            next()

        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized, token failed')

        }

    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
})

// verify if admin
const admin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next()

    } else {
        res.status(401)
        throw new Error("Not authorized as an admin")
    }
}


export {protect,admin};
