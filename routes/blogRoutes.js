import express  from 'express';
const router = express.Router();
import { getBlog, setBlog, updateBlog, deleteBlog,getBlogById } from '../controllers/blogController.js';


// Middleware
// import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getBlog)

router.route('/:id').get(getBlogById)

router.route('/').post(setBlog);

router.put('/:id', updateBlog)

router.route('/:id').delete(deleteBlog)

export default router;

