import asyncHandler from "express-async-handler" 
import multer from 'multer'
import Family from '../models/familyActivityModel.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET,
});



// @ desc Get family activity
// @route GET/api/family
// @acess Private

const getFamily = asyncHandler( async (req,res) =>{
   try{
      const family = await Family.find()
      res.status(200)
      res.json(family)
     }
     catch(err){
      res.json({message:err})
     }
})


// @ desc Get family by id
// @route GET/api/family/:id
// @acess Private

const getFamilyById = async (req,res) =>{
   const {id} = req.params
   const family = await Family.findById(id)
   if(!family){
      res.status(400)
      res.json('Family activity not found')
  }else{
   res.status(200).json(family)
}
}

// @ desc Set family activity
// @route POST/api/family
// @acess Private
const setFamily = asyncHandler(async (req, res) => {
   const {  cardTitle, cardDescription } = req.body;

   // Upload cardImage
   const cardImageResult = await cloudinary.uploader.upload(
     req.files['cardImage'][0].path,
     {
      api_key: '347137159686789',
      api_secret : '5gJrJIh1TObzsGiNXd38gP_EkLc',
      cloud_name: 'dzelffpdf'
     }
   );
   try{
   const newFamily = await Family.create({
     cardTitle,
     cardDescription,
     cardImage: {
       public_id: cardImageResult.public_id,
       url: cardImageResult.secure_url,
     },
   });
   
   res.status(200).json({ message: 'Created successfully', newFamily });}
   catch(err){
    res.json({"message":err})
}
    });
 
// @ desc Update Family activity
// @route PUT/api/family/:id
// @acess Private

const updateFamily = asyncHandler(async (req,res) =>{ 
   const { cardTitle, cardDescription } = req.body;

   const existingFamily = await Family.findById(req.params.id)
   if(!existingFamily){
       res.status(400)
       res.json(`Couldn't find Family Activity`)
   }
   else{
      // Upload new cardImage if provided
      let cardImage = existingOlder.cardImage;
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
      const updatedFamily = await Family.findByIdAndUpdate(
        req.params.id,
        {
          cardTitle,
          cardDescription,
          cardImage
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Updated successfully', updatedFamily });
   }
});



// @ desc Delete family activity
// @route Delete/api/family/:id
// @acess Private

const deleteFamily = asyncHandler(async (req,res) =>{
   const deletedFamily = await Family.findById(req.params.id)
   if(!deletedFamily){
       res.status(400)
       res.json(`Couldn't find Older Activity`)
   }
   else{
      await Family.deleteOne({_id: req.params.id});
      res.status(200).json({id:req.params.id,
       message: 'Deleted successfully'})
   }
})


export { getFamily, setFamily, updateFamily, deleteFamily,getFamilyById }