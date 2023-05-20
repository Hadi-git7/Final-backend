import express  from 'express';
const router = express.Router();
import{ getOverview, setOverview, updateOverview, deleteOverview,getOverviewById } from '../controllers/overviewController.js';
import uploadImage from '../middleware/uploadImage.js';


// Middleware
// import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getOverview)

router.route('/:id').get(getOverviewById)

router.route('/').post(
  uploadImage.fields([
    { name: 'firstImage', maxCount: 1, dest: 'uploads/first' },
    { name: 'secondImage', maxCount: 1, dest: 'uploads/second' },
    { name: 'thirdImage', maxCount: 1, dest: 'uploads/third' },

  ]),
  setOverview
);

router.put('/:id', uploadImage.fields([
  { name: 'firstImage', maxCount: 1 },
  { name: 'secondImage', maxCount: 1 },
  { name: 'thirdImage', maxCount: 1 }

]), updateOverview)

router.route('/:id').delete(deleteOverview)

export default router;
