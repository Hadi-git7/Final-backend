import express from 'express';
const router = express.Router();



// Controllers
import { loginAdmin, registerAdmin, getAllAdmins } from '../controllers/adminController.js';


// Routes
router.route('/').post(registerAdmin).get(getAllAdmins)
router.post('/login', loginAdmin)




// module.exports=admin_route;
export default router;