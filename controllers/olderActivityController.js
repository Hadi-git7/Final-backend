import asyncHandler from "express-async-handler" 
import multer from 'multer'
import Older from '../models/olderActivityModel.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET,
});



// @ desc Get older activity
// @route GET/api/older
// @acess Private

const getOlder = asyncHandler( async (req,res) =>{
   try{
      const older = await Older.find()
      res.status(200)
      res.json(older)
     }
     catch(err){
      res.json({message:err})
     }
})


// @ desc Get older by id
// @route GET/api/older/:id
// @acess Private

const getOlderById = async (req,res) =>{
   const {id} = req.params
   const older = await Older.findById(id)
   if(!older){
      res.status(400)
      res.json('Older activity not found')
  }else{
   res.status(200).json(older)
}
}

// @ desc Set older activity
// @route POST/api/older
// @acess Private
const setOlder = asyncHandler(async (req, res) => {
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
   const newOlder = await Older.create({
     cardTitle,
     cardDescription,
     cardImage: {
       public_id: cardImageResult.public_id,
       url: cardImageResult.secure_url,
     },
   });
   
   res.status(200).json({ message: 'Created successfully', newOlder });}
   catch(err){
    res.json({"message":err})
}
    });
 
// @ desc Update older activity
// @route PUT/api/older/:id
// @acess Private

const updateOlder = asyncHandler(async (req,res) =>{ 
   const { cardTitle, cardDescription } = req.body;

   const existingOlder = await Older.findById(req.params.id)
   if(!existingOlder){
       res.status(400)
       res.json(`Couldn't find Older Activity`)
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
      const updatedOlder = await Older.findByIdAndUpdate(
        req.params.id,
        {
          cardTitle,
          cardDescription,
          cardImage
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Updated successfully', updatedOlder });
   }
});



// @ desc Delete older activity
// @route Delete/api/older/:id
// @acess Private

const deleteOlder = asyncHandler(async (req,res) =>{
   const deletedOlder = await Older.findById(req.params.id)
   if(!deletedOlder){
       res.status(400)
       res.json(`Couldn't find Older Activity`)
   }
   else{
      await Older.deleteOne({_id: req.params.id});
      res.status(200).json({id:req.params.id,
       message: 'Deleted successfully'})
   }
})


export { getOlder, setOlder, updateOlder, deleteOlder,getOlderById }