import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors'

//Import Files
import errorHandler from './middleware/errorMiddleware.js'
import adminRoutes from './routes/adminRoutes.js'
import activityRoutes from './routes/activityRoutes.js'
import overviewRoutes from './routes/overviewRoutes.js'
import homeRoutes from './routes/homeRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import resourceRoutes from './routes/resourceRoutes.js'

dotenv.config();

connectDB();

const PORT = process.env.PORT || 6000;

const app = express();


if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

//middle ware 
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(cors())
app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'))


// app.use(notFound);
app.use(errorHandler);

//routes
app.use('/api/home',homeRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/activity',activityRoutes)
app.use('/api/overview',overviewRoutes)
app.use('/api/blog',blogRoutes)
app.use('/api/resource',resourceRoutes)
 
 
   
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`))
