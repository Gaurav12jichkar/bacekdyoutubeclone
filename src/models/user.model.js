import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
       required:true,
        lowercase:true,
        trim:true,
        index:true

    },
    avatar:{
        type:String,
        required:true,

    },
    watchHistory:[
        {
        type:Schema.Types.ObjectId,
        ref:"video"

    }
],
    password:{
        type:String,
        required:[true,"password is required"]
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
}
)
userSchema.pre("save", async function(next)
{
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password, 10)
    next()
}
)
userSchema.methods.ispasswordCurrect=async function (password) {
    return await bcrypt.compare(password,this.password)
    
}
userSchema.methods.generateAcessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generaterefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
         {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const user=mongoose.model("user",userSchema)