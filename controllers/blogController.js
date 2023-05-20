import asyncHandler from "express-async-handler" 
import multer from 'multer'
import Blog from '../models/blogModel.js'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET,
});



// @ desc Get blog
// @route GET/api/blog
// @acess Private

const getBlog = asyncHandler( async (req,res) =>{
   try{
      const blog = await Blog.find()
      res.status(200)
      res.json(blog)
     }
     catch(err){
      res.json({message:err})
     }
})   


// @ desc Get blog by id
// @route GET/api/blog/:id
// @acess Private

const getBlogById = async (req,res) =>{
   const {id} = req.params
   const blog = await Blog.findById(id)
   if(!blog){
      res.status(400)
      res.json('Blog not found')
  }else{
   res.status(200).json(blog)
}
}

// @ desc Set blog
// @route POST/api/blog
// @acess Private
const setBlog = asyncHandler(async (req, res) => {
   const { name, email, advice, topic } = req.body;
  
   
   const newBlog = await Blog.create({
     name,
     email,
     advice,
     topic,
   });
   
   res.status(200).json({ message: 'Created successfully', newBlog });
    });
 
// @ desc Update blog
// @route PUT/api/blog/:id
// @acess Private

const updateBlog = asyncHandler(async (req,res) =>{ 
    const { name, email, advice, topic } = req.body;

   const existingBlog = await Blog.findById(req.params.id)
   if(!existingBlog){
       res.status(400)
       res.json(`Couldn't find Blog`)
   }
   else{
      // Update the blog
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          advice,
          topic,
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Updated successfully', updatedBlog });
   }
});



// @ desc Delete blog
// @route Delete/api/blog/:id
// @acess Private

const deleteBlog = asyncHandler(async (req,res) =>{
   const deletedBlog = await Blog.findById(req.params.id)
   if(!deletedBlog){
       res.status(400)
       res.json(`Couldn't find Blog`)
   }
   else{
      await Blog.deleteOne({_id: req.params.id});
      res.status(200).json({id:req.params.id,
       message: 'Deleted successfully'})
   }
})


export { getBlog, setBlog, updateBlog, deleteBlog,getBlogById }