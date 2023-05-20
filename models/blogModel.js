import mongoose from 'mongoose'

const blogSchema = mongoose.Schema(
    {
    name : {
        type : String,
    },
    email : {
        type:String,
        unique:true,
    },
    advice : {
        type : String,
    },
    topic : {
        type : String,
    }
},
{ 
    timestamps : true
}
)

export default mongoose.model('Blog', blogSchema)
