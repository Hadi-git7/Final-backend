import mongoose from 'mongoose'

const youngerActivitySchema = mongoose.Schema(
    {
    generalTitle : {
        type : String,
    },
    generalImage : {
        type:Object,
    },
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

export default mongoose.model('youngerActivity', youngerActivitySchema)
