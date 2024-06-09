import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'

// configure env
dotenv.config()

// database connect
// connectDB();

// rest object
const app = express()

// middlewares 
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
// routers
app.use(`/api/v1/auth`, authRoute);

//category
app.use('/api/v1/category', categoryRoute);

//product
app.use('/api/v1/product', productRoute);


const PORT = process.env.PORT || 8080
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`${process.env.DEV_MODE} Running on Server  ${PORT}`.bgGreen.black);
    })

})


// {
//     "name":"sanskruti",
//     "email":"sansk@",
//     "password": "124fc",
//     "phone": "+91783989889",
//     "address":"Raw Road, Mumbai"

// }