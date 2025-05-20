import express from 'express';
import productroutes from './routes/productroutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors';
import path from 'path';
dotenv.config();

const app = express();  

const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors({origin:'http://localhost:5173'}));

app.use('/api/products', productroutes);

console.log(process.env.MONGO_URI);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  );
}



app.listen(5000, () => {
    connectDB();
    console.log('Server is running at http://localhost:'+port);
});

