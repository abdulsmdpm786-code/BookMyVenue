import 'dotenv/config'
import express from "express"
import connectDB from './Config/DB_config.js'
import  apiRouter  from './Routes/index.js'
import cookieParser from 'cookie-parser'


const app = express()
app.use(express.json())
app.use(cookieParser())


connectDB()
app.use('/api', apiRouter)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}...`);
    
})