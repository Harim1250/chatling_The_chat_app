import express from 'express'
import authrouth from './routes/auth.routh.js'
import dotenv from "dotenv"
import connectdata from './modules/connection.js';

const app = express();
dotenv.config()
const port = process.env.PORT


// database connection 
connectdata('mongodb://localhost:27017/chatling')
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("not connecting", err)); 

  
// auth routh
app.use('/api/auth',authrouth)


// app.get('/', (req,res) =>{
// res.send("the app is running")
// })

app.listen(port,() => {
    console.log(`the app is listing at port ${port}`)
})