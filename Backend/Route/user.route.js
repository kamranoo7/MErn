let express=require("express")
const { UserModel } = require("../Model/user.model")
let userRouter=express.Router()
let bcrypt=require("bcrypt")
let jwt=require('jsonwebtoken')
const { backlist } = require("../backlist")
//Register
userRouter.post("/register",async(req,res)=>{
    let {name,email,gender,pass}=req.body
    let user=await UserModel.findOne({email})
    if(user){
        res.status(200).send({"msg":"user already exist"})
    }else{
        try{
bcrypt.hash(pass,5,async(err,hash)=>{
    let user=new UserModel({email,name,gender,pass:hash})
    await user.save()
    res.status(200).send({"msg":"new user has been added"})
})
        }catch(err){
        res.status(400).send({"msg":err.message})
        }
    }

})
//Login
userRouter.post("/login",async(req,res)=>{
    let {email,pass}=req.body
    try{
let user=await UserModel.findOne({email})
if(user){
    bcrypt.compare(pass,user.pass,(err,result)=>{
        if(result){
            let token=jwt.sign({userID:user._id},"masai")
            res.status(200).send({"msg":"Login Succesfully","token":token})
        }else{
            res.status(400).send({"msg":"wrong credential"})
        }
    })
}
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
userRouter.get("/logout",(req,res)=>{
    let token=req.headers.authorization?.split(" ")[1]
    try{
        backlist.push(token)
        res.status(200).json({msg:"User has been logged out"})
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

module.exports={
    userRouter
} 