import express  from 'express';
const router = express.Router();
import { getActivity, setActivity, updateActivity, deleteActivity,getActivityById} from '../controllers/activityController.js';
import uploadImage from '../middleware/uploadImage.js';


// Middleware
// import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getActivity)
router.route('/:id').get(getActivityById)
router.route('/').post(
  uploadImage.fields([
    { name: 'generalImage', maxCount: 1, dest: 'uploads/general' },
    { name: 'cardImage', maxCount: 1, dest: 'uploads/card' },
  ]),
  setActivity
);
router.put('/:id', uploadImage.fields([
  { name: 'generalImage', maxCount: 1 },
  { name: 'cardImage', maxCount: 1 }
]), updateActivity)
router.route('/:id').delete(deleteActivity)

export default router;
