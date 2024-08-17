import express, { urlencoded } from 'express';
import cors from 'cors';
import cookiePerser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';

dotenv.config({});
const PORT = process.env.PORT || 6007;

const app = express();

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Backend running',
        success: true
    })
})

app.use(express.json());
app.use(cookiePerser());
app.use(urlencoded({extended: true}));

const corsOption = {
    origin: 'http//localhost:5173',
    credentials: true,
}

app.use(cors(corsOption));

app.use('/api/v1/user', userRoute)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port: ${PORT}`);
})