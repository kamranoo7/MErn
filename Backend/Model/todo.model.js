let mongoose=require("mongoose")
let todoSchema=mongoose.Schema({
   
    title:String,
    userID:String,
})
let todoModel=mongoose.model("todo",todoSchema)

module.exports={
    todoModel
}