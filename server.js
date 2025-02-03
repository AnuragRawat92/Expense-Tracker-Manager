const express =require("express")
const cors=require("cors")
const morgan=require("morgan")
const dotenv=require("dotenv")
const colors=require("colors")
const  connectDb = require("./config/connectdb.js")
const app=express()
const path=require('path')
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
dotenv.config()
connectDb()
// app.get('/',(req,res)=>{
//     res.send("<h1>hello</h1>")
// })
app.use('/api/v1/users',require('./routes/userRoute.js')) 
app.use('/api/v1/transactions', require('./routes/transactionRoutes.js'));
// static files
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})
const port=8080||process.env.port
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})