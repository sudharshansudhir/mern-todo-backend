const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
require("dotenv").config();


const app=express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

const schema=new mongoose.Schema({
    title:String,
    desc:String,
})

const todolist=new mongoose.model("todo_lists",schema)


//CREATE
app.post("/todo",async(req,res)=>{
    
        let title=req.body.title
        let desc=req.body.desc
        try {
            const newItem=new todolist({
            title:title,
            desc:desc
        })
        newItem.save()
        res.status(201).json(newItem)

    } catch (error) {
        console.log("Error is : "+error.message);    
        res.status(404)
    }
})
//READ
app.get("/todo",async(req,res)=>{
    try {
        let getItems=await todolist.find()
        res.status(201).json(getItems)
    } catch (error) {
        console.log("Error is : "+error.message);    
        res.status(404)
    }
})
//UPDATE
app.put("/todo/:id",async(req,res)=>{
    try {
        const ids=req.params.id
        let title=req.body.title
        let desc=req.body.desc
        
            let updated=await todolist.findByIdAndUpdate(ids,{title,desc},{new:true})
        res.status(201).json(updated)
    } catch (error) {
        console.log("Error is : "+error.message);    
        res.status(404)
    }
})
//DELETE
app.delete("/todo/:id",async(req,res)=>{
    try {
        const id=req.params.id
        await todolist.findByIdAndDelete(id)
        res.status(204).end()
    } catch (error) {
        console.log("Error is : "+error.message);    
        res.status(404)
    }
})

app.use("/",(req,res)=>{
    res.send("<h1>THE FINAL SSR RECKONING</h1>")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});


