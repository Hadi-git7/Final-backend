import asyncHandler from "express-async-handler" 
import multer from 'multer'
import Home from '../models/homeModel.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET,
});



// @ desc Get home
// @route GET/api/home
// @acess Private

const getHome = asyncHandler( async (req,res) =>{
   try{
      const home = await Home.find()
      res.status(200)
      res.json(home)
     }
     catch(err){
      res.json({message:err})
     }
})


// @ desc Get home by id
// @route GET/api/home/:id
// @acess Private

const getHomeById = async (req,res) =>{
   const {id} = req.params
   const home = await Home.findById(id)
   if(!home){
      res.status(400)
      res.json('Home not found')
  }else{
   res.status(200).json(home)
}
}

// @ desc Set home
// @route POST/api/home
// @acess Private
const setHome = asyncHandler(async (req, res) => {
   const { title, introduction, description, goal } = req.body;
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

      // Upload thirdImage
      const thirdImageResult = await cloudinary.uploader.upload(
        req.files['thirdImage'][0].path,
        {
         api_key: '347137159686789',
         api_secret : '5gJrJIh1TObzsGiNXd38gP_EkLc',
         cloud_name: 'dzelffpdf'
        }
      );
   
   const newHome = await Home.create({
     title,
     introduction,
     description,
     goal,
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
   
   res.status(200).json({ message: 'Created successfully', newHome });
    });
 
// @ desc Update home
// @route PUT/api/home/:id
// @acess Private

const updateHome = asyncHandler(async (req,res) =>{ 
    const { title, introduction, description, goal } = req.body;

   const existingHome = await Home.findById(req.params.id)
   if(!existingHome){
       res.status(400)
       res.json(`Couldn't find Home`)
   }
   else{
      // Upload new firstImage if provided
      let firstImage = existingHome.firstImage;
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
      let secondImage = existingHome.secondImage;
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
       let thirdImage = existingHome.thirdImage;
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

      

      // Update the home
      const updatedHome = await Home.findByIdAndUpdate(
        req.params.id,
        {
          title,
          introduction,
          description,
          goal,
          firstImage,
          secondImage,
          thirdImage
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Updated successfully', updatedHome });
   }
});



// @ desc Delete home
// @route Delete/api/home/:id
// @acess Private

const deleteHome = asyncHandler(async (req,res) =>{
   const deletedHome = await Home.findById(req.params.id)
   if(!deletedHome){
       res.status(400)
       res.json(`Couldn't find Home`)
   }
   else{
      await Home.deleteOne({_id: req.params.id});
      res.status(200).json({id:req.params.id,
       message: 'Deleted successfully'})
   }
})


export { getHome, setHome, updateHome, deleteHome,getHomeById }