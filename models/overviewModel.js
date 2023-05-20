import mongoose from 'mongoose'

const overviewSchema = mongoose.Schema(
    {
    title : {
        type : String,
    },
    definition : {
        type:String,
    },
    diagnosis : {
        type : String,
    },
    treatment : {
        type : String,
    },
    symptoms : {
        type:String,
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

export default mongoose.model('Overview', overviewSchema)
