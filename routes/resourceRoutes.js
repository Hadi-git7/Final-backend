import express  from 'express';
const router = express.Router();
import { getResource, setResource, updateResource, deleteResource,getResourceById } from '../controllers/resourceController.js';
import uploadImage from '../middleware/uploadImage.js';


// Middleware
// import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getResource)
router.route('/:id').get(getResourceById)
router.route('/').post(
  uploadImage.fields([
    { name: 'cardImage', maxCount: 1, dest: 'uploads/card' },
  ]),
  setResource
);
router.put('/:id', uploadImage.fields([
  { name: 'cardImage', maxCount: 1 }
]), updateResource)
router.route('/:id').delete(deleteResource)

export default router;
