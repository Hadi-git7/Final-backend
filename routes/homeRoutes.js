import express  from 'express';
const router = express.Router();
import { getHome, setHome, updateHome, deleteHome,getHomeById } from '../controllers/homeController.js';
import uploadImage from '../middleware/uploadImage.js';


// Middleware
// import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getHome)

router.route('/:id').get(getHomeById)

router.route('/').post(
  uploadImage.fields([
    { name: 'firstImage', maxCount: 1, dest: 'uploads/first' },
    { name: 'secondImage', maxCount: 1, dest: 'uploads/second' },
    { name: 'thirdImage', maxCount: 1, dest: 'uploads/third' },

  ]),
  setHome
);

router.put('/:id', uploadImage.fields([
  { name: 'firstImage', maxCount: 1 },
  { name: 'secondImage', maxCount: 1 },
  { name: 'thirdImage', maxCount: 1 }

]), updateHome)

router.route('/:id').delete(deleteHome)

export default router;
