import express  from 'express';
const router = express.Router();
import { getYounger, setYounger, updateYounger, deleteYounger,getYoungerById } from '../controllers/youngerActivityController.js';
import uploadImage from '../middleware/uploadImage.js';


// Middleware
// import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getYounger)
router.route('/:id').get(getYoungerById)
router.route('/').post(
  uploadImage.fields([
    { name: 'generalImage', maxCount: 1, dest: 'uploads/general' },
    { name: 'cardImage', maxCount: 1, dest: 'uploads/card' },
  ]),
  setYounger
);
router.put('/:id', uploadImage.fields([
  { name: 'generalImage', maxCount: 1 },
  { name: 'cardImage', maxCount: 1 }
]), updateYounger)
router.route('/:id').delete(deleteYounger)

export default router;
