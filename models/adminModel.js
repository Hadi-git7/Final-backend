import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({

    email:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
    passwordConfirmation:{
        type: String,
        required:true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
},);


adminSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

adminSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
       next() 
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt);
});

adminSchema.pre('save', async function(next) {
    if(!this.isModified('passwordConfirmation')){
       next() 
    }
    const salt = await bcrypt.genSalt(10)
    this.passwordConfirmation = await bcrypt.hash(this.passwordConfirmation,salt);
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
 