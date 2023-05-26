import express  from 'express';
const router = express.Router();
import  { getFamily, setFamily, updateFamily, deleteFamily,getFamilyById }  from '../controllers/familyActivityController.js';
import uploadImage from '../middleware/uploadImage.js';


// Middleware
// import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').get(getFamily)
router.route('/:id').get(getFamilyById)
router.route('/').post(
  uploadImage.fields([
    { name: 'cardImage', maxCount: 1, dest: 'uploads/card' },
  ]),
  setFamily
);
router.put('/:id', uploadImage.fields([
  { name: 'cardImage', maxCount: 1 }
]), updateFamily)
router.route('/:id').delete(deleteFamily)

export default router;
