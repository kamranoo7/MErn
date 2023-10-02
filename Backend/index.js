let express=require('express')
let cors=require('cors')
require("dotenv").config()
const { connection } = require('./db')
const { userRouter } = require('./Route/user.route')
const { todoRouter } = require('./Route/todo.routes')
const { auth } = require('./Middleware/auth.middleware')
let app=express()
app.use(express.json())
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use(auth)
app.use("/todo",todoRouter)
app.listen(process.env.port,async()=>{
    await connection
    try{
console.log("Connected to DB")
    }catch(err){
console.log(err)
console.log("noy connected to db")
    }
    console.log("Server is running")
})