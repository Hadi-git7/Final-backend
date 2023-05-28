import asyncHandler from "express-async-handler" 
import multer from 'multer'
import Younger from '../models/youngerActivityModel.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET,
});



// @ desc Get younger activity
// @route GET/api/younger
// @acess Private

const getYounger = asyncHandler( async (req,res) =>{
   try{
      const younger = await Younger.find()
      res.status(200)
      res.json(younger)
     }
     catch(err){
      res.json({message:err})
     }
})


// @ desc Get younger by id
// @route GET/api/younger/:id
// @acess Private

const getYoungerById = async (req,res) =>{
   const {id} = req.params
   const younger = await Younger.findById(id)
   if(!younger){
      res.status(400)
      res.json('Younger activity not found')
  }else{
   res.status(200).json(younger)
}
}

// @ desc Set younger activity
// @route POST/api/younger
// @acess Private
const setYounger = asyncHandler(async (req, res) => {
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
   const newYounger = await Younger.create({

     cardTitle,
     cardDescription,
     cardImage: {
       public_id: cardImageResult.public_id,
       url: cardImageResult.secure_url,
     },
   });
   
   res.status(200).json({ message: 'Created successfully', newYounger });}
   catch(err){
    res.json({"message":err})
}
    });
 
// @ desc Update younger activity
// @route PUT/api/younger/:id
// @acess Private

const updateYounger = asyncHandler(async (req,res) =>{ 
   const {  cardTitle, cardDescription } = req.body;

   const existingYounger = await Younger.findById(req.params.id)
   if(!existingYounger){
       res.status(400)
       res.json(`Couldn't find Younger Activity`)
   }
   else{
 

      // Upload new cardImage if provided
      let cardImage = existingYounger.cardImage;
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
      const updatedYounger = await Younger.findByIdAndUpdate(
        req.params.id,
        {
          cardTitle,
          cardDescription,
          cardImage
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Updated successfully', updatedYounger });
   }
});



// @ desc Delete younger activity
// @route Delete/api/younger/:id
// @acess Private

const deleteYounger = asyncHandler(async (req,res) =>{
   const deletedYounger = await Younger.findById(req.params.id)
   if(!deletedYounger){
       res.status(400)
       res.json(`Couldn't find Younger Activity`)
   }
   else{
      await Younger.deleteOne({_id: req.params.id});
      res.status(200).json({id:req.params.id,
       message: 'Deleted successfully'})
   }
})


export { getYounger, setYounger, updateYounger, deleteYounger,getYoungerById }