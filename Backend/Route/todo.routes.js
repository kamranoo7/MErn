let express=require('express')

const { todoModel } = require('../Model/todo.model')
let todoRouter=express.Router()

//Post
todoRouter.post("/add",async(req,res)=>{

    try{
let todo=new todoModel(req.body)
await todo.save()
res.status(200).json({msg:"todo added","addedtodo":req.body})
    }catch(err){
res.status(400).json({error:err.message})
    }
})

//Get
todoRouter.get("/",async(req,res)=>{
 
    try{
        let todo=await todoModel.find({userID:req.body.userID})
        res.send(todo)
       
    }catch(err){
        res.status(400).json({error:err.message})
    }
})


//Update
todoRouter.patch("/update/:postID",async(req,res)=>{
    let payload=req.body
    let {postID}=req.params
   
    try{
        await todoModel.findByIdAndUpdate({_id:postID},payload)
        res.status(200).json({msg:"todo has been updated"})
    }catch(err){
        res.status(400).json({error:err.message})
    }
    })
    //delete
    todoRouter.delete("/delete/:postID",async(req,res)=>{
        let {postID}=req.params
        let post=await todoModel.findOne({_id:postID})
        try{
            if(req.body.authorID!==post.authorID){
                res.status(200).send({"msg":"You are not Authorised"})
            }else{
                await todoModel.findByIdAndDelete({_id:postID})
                res.status(200).send({"msg":"The post has been deleted"})
            }
        }catch(err){
            res.status(400).send({"msg":err.message})
        }
        })




module.exports={
    todoRouter
}        