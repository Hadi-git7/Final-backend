import express  from 'express';
const router = express.Router();
import { getOlder, setOlder, updateOlder, deleteOlder,getOlderById }  from '../controllers/olderActivityController.js';
import uploadImage from '../middleware/uploadImage.js';


// Middleware
// import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getOlder)
router.route('/:id').get(getOlderById)
router.route('/').post(
  uploadImage.fields([
    { name: 'cardImage', maxCount: 1, dest: 'uploads/card' },
  ]),
  setOlder
);
router.put('/:id', uploadImage.fields([
  { name: 'cardImage', maxCount: 1 }
]), updateOlder)
router.route('/:id').delete(deleteOlder)

export default router;
