import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// user login
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        // console.log('Authorization Header:', req.headers.authorization);
        // adding decode in loginUser so that is Admin is checked
        req.loginUser = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

// export const requireSignIn = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization;

//         if (!token) {
//             return res.status(401).send({
//                 success: false,
//                 message: 'JWT token must be provided in the authorization header'
//             });
//         }

//         const decode = await JWT.verify(token.split(' ')[1], process.env.SECURITY_KEY);
//         req.loginUser = decode;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(401).send({
//             success: false,
//             message: 'Invalid JWT token',
//             error
//         });
//     }
// };


// admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById({ _id: req.loginUser._id });
        if (user.role !== 1) {
            return res.status(404).send({
                success: false,
                message: "Unauthorized Access"
            })
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Error in Admin Middleware",
            error
        })
    }
}

