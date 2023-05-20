import asyncHandler from "express-async-handler" 
import multer from 'multer'
import Resource from '../models/resourceModel.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET,
});



// @ desc Get resource
// @route GET/api/resource
// @acess Private

const getResource = asyncHandler( async (req,res) =>{
   try{
      const resource = await Resource.find()
      res.status(200)
      res.json(resource)
     }
     catch(err){
      res.json(err);
      
     }
})


// @ desc Get resource by id
// @route GET/api/resource/:id
// @acess Private

const getResourceById = async (req,res) =>{
   const {id} = req.params
   const resource = await Resource.findById(id)
   if(!resource){
      res.status(400)
      res.json('Resource not found')
  }else{
   res.status(200).json(resource)
}
}

// @ desc Set resource
// @route POST/api/resource
// @acess Private
const setResource = asyncHandler(async (req, res) => {
   const { generalTitle,description, cardTitle, cardDescription } = req.body;
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
   
   const newResource = await Resource.create({
     generalTitle,
     generalImage: {
       public_id: generalImageResult.public_id,
       url: generalImageResult.secure_url,
     },
     description,
     cardTitle,
     cardDescription,
     cardImage: {
       public_id: cardImageResult.public_id,
       url: cardImageResult.secure_url,
     },
   });
   
   res.status(200).json({ message: 'Created successfully', newResource });
    });
 
// @ desc Update resource
// @route PUT/api/resource/:id
// @acess Private

const updateResource = asyncHandler(async (req,res) =>{ 
   const { generalTitle,description, cardTitle, cardDescription } = req.body;

   const existingResource = await Resource.findById(req.params.id)
   if(!existingResource){
       res.status(400)
       res.json(`Couldn't find Resource`)
   }
   else{
      // Upload new generalImage if provided
      let generalImage = existingResource.generalImage;
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
      let cardImage = existingResource.cardImage;
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

      // Update the resource
      const updatedResource = await Resource.findByIdAndUpdate(
        req.params.id,
        {
          generalTitle,
          description,
          generalImage,
          cardTitle,
          cardDescription,
          cardImage
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Updated successfully', updatedResource });
   }
});



// @ desc Delete resource
// @route Delete/api/resource/:id
// @acess Private

const deleteResource = asyncHandler(async (req,res) =>{
   const deletedResource = await Resource.findById(req.params.id)
   if(!deletedResource){
       res.status(400)
       res.json(`Couldn't find Resource`)
   }
   else{
      await Resource.deleteOne({_id: req.params.id});
      res.status(200).json({id:req.params.id,
       message: 'Deleted successfully'})
   }
})


export { getResource, setResource, updateResource, deleteResource,getResourceById }