import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"

// Models
import Admin from "../models/adminModel.js"


// @ desc Register user and create token
// @route POST/api/admin
// @acess Public

const registerAdmin = asyncHandler(async(req,res)=>{ 
    
    
    const {email,password,passwordConfirmation,isAdmin}=req.body

    // check if user exists
    const adminExists = await Admin.findOne({email})

    if(adminExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const admin = await Admin.create({
        email,
        password,
        passwordConfirmation,
        isAdmin: isAdmin && isAdmin,
    })
    if (admin){
        res.status(201).json({
            _id:admin.id,
            email:admin.email,
            isAdmin : admin.isAdmin,
            token:generateToken(admin._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')  
    }   
});

// @route   Get /api/admin   
// @ desc   Get all admins
// @access  Private

const getAllAdmins = asyncHandler(async(req,res)=>{
    try{
        const admins = await Admin.find()
    res.json(admins)
    }catch(err){
        res.json(err.message)
    }
});

// @route    POST /api/admin/login
// @ desc    Login admin and get admin
// @acess    Public

const loginAdmin = asyncHandler(async(req,res)=>{
        const{email,password} = req.body
    
        // check for admin email 
        const admin = await Admin.findOne({email})
    
        // check for admin password and email combination
        if (admin && (await admin.matchPassword(password))){
            res.json({
                _id:admin._id,
                email:admin.email,
                isAdmin:admin.isAdmin,
                token:generateToken(admin._id)
            })
        } else {
            res.status(401)
            throw new Error('Invalid email or password')
        }
    
        
    })



    export { registerAdmin, getAllAdmins, loginAdmin }