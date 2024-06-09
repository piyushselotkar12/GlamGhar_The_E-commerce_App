import { hashPassword, comparePassword } from "../helpers/authhelper.js";
import JWT from 'jsonwebtoken';
import userModel from "../models/userModel.js";
//import { hash } from "bcrypt";
import orderModel from "../models/orderModel.js";
export const registerController = async (req, res) => {
    try {
        const { name, password, email, phone, address, answer } = req.body;
        // Validations

        if (!name) {
            return res.send({ message: "Name is required" });
        }

        if (!password) {
            return res.send({ message: "Password is required" });
        }

        if (!email) {
            return res.send({ message: "Email is required" });
        }

        if (!phone) {
            return res.send({ message: "Phone Number is required" });
        }

        if (!address) {
            return res.send({ message: "Address is required" });
        }

        if (!answer) {
            return res.send({ message: "Answer is required" });
        }

        //existing user(bcoz same email se do log nhi register ho sakte hai)
        const existinguser = await userModel.findOne({ email })
        console.log("existinguser",existinguser);

        if (existinguser) {
            return res.status(400).send({
                success: false,
                message: "Already Registered, Please Login"
            })
        }

        //register user
        const hashPass = await hashPassword(password)

        //save
        const user = await new userModel({ name, email, password: hashPass, phone, address, answer }).save()
        console.log("user",user);
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Error in Registration',
                error
            }
        )
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        // check user
        const loginUser = await userModel.findOne({ email: email });
        if (!loginUser) {
            return res.status(404).send(
                {
                    success: false,
                    message: "Email is not registered"

                })
        }
        const match = await comparePassword(password, loginUser.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Incorrect Password"
            });
        }

        // token

        const token = await JWT.sign({ _id: loginUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: loginUser.name,
                email: loginUser.email,
                phone: loginUser.phone,
                address: loginUser.address,
                role: loginUser.role,
                _id: loginUser._id
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        }
        )
    }
}

// forget password Controller
export const forgetPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "Answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "Newpassword is required" });
        }
        const user = await userModel.findOne({ email, answer });
        // validation
        if (!user) {
            res.status(400).send({
                success: false,
                message: "Email or Answer is not valid"
            })
        }
        //const hashed = await hashPassword(newPassword);
        //await userModel.findByIdAndUpdate(user._id, { password: hashed })

        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        })
    }
    catch (err) {
        res.status(400).send({
            success: false,
            message: 'Something went wrong',
            error,
        })
    }
}

// test Controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
}

// User Profile Controller

export const userProfileController = async (req, res) => {
    try {
        const { name, phone, password, address } = req.body
        if (password && password < 6) {
            res.json("Password is required and should be atleast 6 characters long")
        }
        //const hashedPassword = password ? hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            //password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
        }, { new: true })
        res.status(200).send({
            success: true,
            message: "Profile updated successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in updating details',
            error
        })
    }
}

// order Controller

export const orderController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.headers._id }).populate("products", "-photo").populate("buyer", "name")
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: true,
            message: 'Error in getting orders',
            error
        })
    }
}

// All Orders Admin Side
export const allOrderController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("products", "-photo").populate("buyer", "name").sort({ createdAt: '-1' })
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: true,
            message: 'Error in getting orders',
            error
        })
    }
}

// Order Status Controller
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in changing order status',
            error
        })
    }
}
