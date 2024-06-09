import express from "express";
import { registerController, loginController, testController, forgetPasswordController, userProfileController, orderController, allOrderController, orderStatusController } from '../controllers/authcontrollers.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object (bcoz dusre file me use krna hai isliye object)
const router = express.Router();

// routes
// Register
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

// forget-password
router.post('/forgot-password', forgetPasswordController);

//test 
router.post('/test', requireSignIn, isAdmin, testController);

// protected user auth route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// protected admin auth route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

// user profile
router.put('/profile', requireSignIn, userProfileController)

//orders
router.get('/orders', requireSignIn, orderController)

//All orders
router.get('/all-orders', requireSignIn, allOrderController)

//orders status
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)
export default router;



// .env   password : HEXWYU4Kb7UVW2DB //