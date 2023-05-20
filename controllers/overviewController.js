import asyncHandler from "express-async-handler" 
import multer from 'multer'
import Overview from '../models/overviewModel.js'
import { v2 as cloudinary } from "cloudinary";
import overviewModel from "../models/overviewModel.js";

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET,
});



// @ desc Get activities
// @route GET/api/activity
// @acess Private

const getOverview = asyncHandler( async (req,res) =>{
   try{
      const overview = await Overview.find()
      res.status(200)
      res.json(overview)
     }
     catch(err){
      res.json({message:err})
     }
})


// @ desc Get overview by id
// @route GET/api/overview/:id
// @acess Private

const getOverviewById = async (req,res) =>{
   const {id} = req.params
   const overview = await Overview.findById(id)
   if(!overview){
      res.status(400)
      res.json('Overview not found')
  }else{
   res.status(200).json(overview)
}
}

// @ desc Set overview
// @route POST/api/overview
// @acess Private
const setOverview = asyncHandler(async (req, res) => {
   const { title, definition, diagnosis, treatment, symptoms } = req.body;
   // Upload generalImage
   const firstImageResult = await cloudinary.uploader.upload(
     req.files['firstImage'][0].path,
     {
      api_key: '347137159686789',
      api_secret : '5gJrJIh1TObzsGiNXd38gP_EkLc',
      cloud_name: 'dzelffpdf'
     }
   );
   
   // Upload secondImage
   const secondImageResult = await cloudinary.uploader.upload(
     req.files['secondImage'][0].path,
     {
      api_key: '347137159686789',
      api_secret : '5gJrJIh1TObzsGiNXd38gP_EkLc',
      cloud_name: 'dzelffpdf'
     }
   );

      // Upload cardImage
      const thirdImageResult = await cloudinary.uploader.upload(
        req.files['thirdImage'][0].path,
        {
         api_key: '347137159686789',
         api_secret : '5gJrJIh1TObzsGiNXd38gP_EkLc',
         cloud_name: 'dzelffpdf'
        }
      );
   
   const newOverview = await Overview.create({
     title,
     definition,
     diagnosis,
     treatment,
     symptoms,
     firstImage: {
       public_id: firstImageResult.public_id,
       url: firstImageResult.secure_url,
     },
     secondImage: {
        public_id: secondImageResult.public_id,
        url: secondImageResult.secure_url,
      },
      thirdImage: {
        public_id: thirdImageResult.public_id,
        url: thirdImageResult.secure_url,
      },
   });
   
   res.status(200).json({ message: 'Created successfully', newOverview });
    });
 
// @ desc Update overview
// @route PUT/api/overview/:id
// @acess Private

const updateOverview = asyncHandler(async (req,res) =>{ 
    const { title, definition, diagnosis, treatment, symptoms } = req.body;

   const existingOverview = await Overview.findById(req.params.id)
   if(!existingOverview){
       res.status(400)
       res.json(`Couldn't find Overview`)
   }
   else{
      // Upload new firstImage if provided
      let firstImage = existingOverview.firstImage;
      if (req.files['firstImage']) {
        const firstImageResult = await cloudinary.uploader.upload(
          req.files['firstImage'][0].path,
          {
            api_key: '347137159686789',
            api_secret: '5gJrJIh1TObzsGiNXd38gP_EkLc',
            cloud_name: 'dzelffpdf'
          }
        );
        firstImage = {
          public_id: firstImageResult.public_id,
          url: firstImageResult.secure_url
        };
      }

      // Upload new secondImage if provided
      let secondImage = existingOverview.secondImage;
      if (req.files['secondImage']) {
        const secondImageResult = await cloudinary.uploader.upload(
          req.files['secondImage'][0].path,
          {
            api_key: '347137159686789',
            api_secret: '5gJrJIh1TObzsGiNXd38gP_EkLc',
            cloud_name: 'dzelffpdf'
          }
        );
        secondImage = {
          public_id: secondImageResult.public_id,
          url: secondImageResult.secure_url
        };
      }

       // Upload new thirdImage if provided
       let thirdImage = existingOverview.thirdImage;
       if (req.files['thirdImage']) {
         const thirdImageResult = await cloudinary.uploader.upload(
           req.files['thirdImage'][0].path,
           {
             api_key: '347137159686789',
             api_secret: '5gJrJIh1TObzsGiNXd38gP_EkLc',
             cloud_name: 'dzelffpdf'
           }
         );
         thirdImage = {
           public_id: thirdImageResult.public_id,
           url: thirdImageResult.secure_url
         };
       }

      

      // Update the activity
      const updatedOverview = await Overview.findByIdAndUpdate(
        req.params.id,
        {
          title,
          definition,
          diagnosis,
          treatment,
          symptoms,
          firstImage,
          secondImage,
          thirdImage
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Updated successfully', updatedOverview });
   }
});



// @ desc Delete activity
// @route Delete/api/activity/:id
// @acess Private

const deleteOverview = asyncHandler(async (req,res) =>{
   const deletedOverview = await Overview.findById(req.params.id)
   if(!deletedOverview){
       res.status(400)
       res.json(`Couldn't find Overview`)
   }
   else{
      await Overview.deleteOne({_id: req.params.id});
      res.status(200).json({id:req.params.id,
       message: 'Deleted successfully'})
   }
})


export { getOverview, setOverview, updateOverview, deleteOverview,getOverviewById }