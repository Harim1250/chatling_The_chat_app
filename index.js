import authrouth from './routes/auth.routh.js'
import dotenv from "dotenv"
import connectdata from './modules/connection.js';
import express from 'express'
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.routh.js';


const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config()
const port = 7000


// database connection 
connectdata('mongodb://localhost:27017/chatling')
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("not connecting", err)); 

  
// auth routh
app.use('/api/auth',authrouth);
// message routh
app.use('/api/message', messageRoutes);

app.get('/', (req,res) =>{
res.send("the app is running")
});

app.listen(port,() => {
    console.log(`the app is listing at port ${port}`)
})