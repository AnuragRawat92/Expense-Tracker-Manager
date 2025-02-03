const mongoose=require("mongoose")
const connectDb=async()=>{
try{
   await mongoose.connect(process.env.mongodb_url , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout
    socketTimeoutMS: 45000, // Increase socket timeout
  })
  console.log(`server connected on ${mongoose.connection.host}`)
}
catch(err){
    console.log(`${err}`)
}
}
module.exports=  connectDb;