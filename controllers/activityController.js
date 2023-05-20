import asyncHandler from "express-async-handler" 
import multer from 'multer'
import Activity from '../models/activityModel.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET,
});



// @ desc Get activities
// @route GET/api/activity
// @acess Private

const getActivity = asyncHandler( async (req,res) =>{
   try{
      const activity = await Activity.find()
      res.status(200)
      res.json(activity)
     }
     catch(err){
      res.json({message:err})
     }
})


// @ desc Get activities by id
// @route GET/api/activity/:id
// @acess Private

const getActivityById = async (req,res) =>{
   const {id} = req.params
   const activity = await Activity.findById(id)
   if(!activity){
      res.status(400)
      res.json('Activity not found')
  }else{
   res.status(200).json(activity)
}
}

// @ desc Set activity
// @route POST/api/activity
// @acess Private
const setActivity = asyncHandler(async (req, res) => {
   const { generalTitle, cardTitle, cardDescription } = req.body;
   // Upload generalImage
   const generalImageResult = await cloudinary.uploader.upload(
     req.files['generalImage'][0].path,
     {
      api_key: '347137159686789',
      api_secret : '5gJrJIh1TObzsGiNXd38gP_EkLc',
      cloud_name: 'dzelffpdf'
     }
   );
   
   // Upload cardImage
   const cardImageResult = await cloudinary.uploader.upload(
     req.files['cardImage'][0].path,
     {
      api_key: '347137159686789',
      api_secret : '5gJrJIh1TObzsGiNXd38gP_EkLc',
      cloud_name: 'dzelffpdf'
     }
   );
   
   const newActivity = await Activity.create({
     generalTitle,
     generalImage: {
       public_id: generalImageResult.public_id,
       url: generalImageResult.secure_url,
     },
     cardTitle,
     cardDescription,
     cardImage: {
       public_id: cardImageResult.public_id,
       url: cardImageResult.secure_url,
     },
   });
   
   res.status(200).json({ message: 'Created successfully', newActivity });
    });
 
// @ desc Update activity
// @route PUT/api/activity/:id
// @acess Private

const updateActivity = asyncHandler(async (req,res) =>{ 
   const { generalTitle, cardTitle, cardDescription } = req.body;

   const existingActivity = await Activity.findById(req.params.id)
   if(!existingActivity){
       res.status(400)
       res.json(`Couldn't find Activity`)
   }
   else{
      // Upload new generalImage if provided
      let generalImage = existingActivity.generalImage;
      if (req.files['generalImage']) {
        const generalImageResult = await cloudinary.uploader.upload(
          req.files['generalImage'][0].path,
          {
            api_key: '347137159686789',
            api_secret: '5gJrJIh1TObzsGiNXd38gP_EkLc',
            cloud_name: 'dzelffpdf'
          }
        );
        generalImage = {
          public_id: generalImageResult.public_id,
          url: generalImageResult.secure_url
        };
      }

      // Upload new cardImage if provided
      let cardImage = existingActivity.cardImage;
      if (req.files['cardImage']) {
        const cardImageResult = await cloudinary.uploader.upload(
          req.files['cardImage'][0].path,
          {
            api_key: '347137159686789',
            api_secret: '5gJrJIh1TObzsGiNXd38gP_EkLc',
            cloud_name: 'dzelffpdf'
          }
        );
        cardImage = {
          public_id: cardImageResult.public_id,
          url: cardImageResult.secure_url
        }; 
      }

      // Update the activity
      const updatedActivity = await Activity.findByIdAndUpdate(
        req.params.id,
        {
          generalTitle,
          generalImage,
          cardTitle,
          cardDescription,
          cardImage
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Updated successfully', updatedActivity });
   }
});



// @ desc Delete activity
// @route Delete/api/activity/:id
// @acess Private

const deleteActivity = asyncHandler(async (req,res) =>{
   const deletedActivity = await Activity.findById(req.params.id)
   if(!deletedActivity){
       res.status(400)
       res.json(`Couldn't find Activity`)
   }
   else{
      await Activity.deleteOne({_id: req.params.id});
      res.status(200).json({id:req.params.id,
       message: 'Deleted successfully'})
   }
})


export { getActivity, setActivity, updateActivity, deleteActivity,getActivityById }