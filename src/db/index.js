import mongoose from "mongoose";
const connectDB=async() =>{
try{
const connectionInstance = await mongoose.connect('${process.env.MONGO_URI}',console.log("mongodb connected"))

}
catch(error){
    console.log("Mongodb failed",console.error);
    process.exit(1)
}
}
export default connectDB