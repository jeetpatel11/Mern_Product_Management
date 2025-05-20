import express from 'express';
import productroutes from './routes/productroutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config();

const app = express();  

const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors({origin:'http://localhost:5173'}));

app.use('/api/products', productroutes);

console.log(process.env.MONGO_URI);


if(process.env.NODE_ENV==="production")
{
    app.use 
}


app.listen(5000, () => {
    connectDB();
    console.log('Server is running at http://localhost:'+port);
});

