let mongoose=require("mongoose")

let userSchema=mongoose.Schema({
    name:String,
    gender:String,
    email:String,
    pass:String
})


let UserModel=mongoose.model("user",userSchema)
module.exports={
    UserModel
}