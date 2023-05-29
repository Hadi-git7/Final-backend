import mongoose from 'mongoose'

const resourceSchema = mongoose.Schema(
    {
 
    cardTitle : {
        type : String,
        required:true,
    },
    cardDescription : {
        type : String,
        required:true,
    },
    cardImage : {
        type:Object,
        required:true,
    },
},
{
    timestamps : true
}
)

export default mongoose.model('Resource', resourceSchema)
