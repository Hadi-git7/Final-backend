import mongoose from 'mongoose'

const homeSchema = mongoose.Schema(
    {
    title : {
        type : String,
    },
    introduction : {
        type:String,
    },
    description : {
        type : String,
    },
    goal : {
        type : String,
    },
    firstImage : {
        type:Object,
    },
    secondImage : {
        type:Object,
    },
    thirdImage : {
        type:Object,
    },
},
{
    timestamps : true
}
)

export default mongoose.model('Home', homeSchema)
