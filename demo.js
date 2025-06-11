const express = require("express")
const app=express()
//mongodb://localhost:27017
const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017")
const mdbs=new mongoose.Schema({
    title:String,
    desc:String
})

const modelmate=new mongoose.model("product",mdbs)


app.use(express.json())


app.post("/todo",async(req,res)=>{
    let title=req.body.title
    let desc=req.body.desc
    try {
        const newTodo=new modelmate({title,desc})
    newTodo.save()
        res.status(201).json(newTodo)

    } catch (error) {
        console.log(error.message)
        res.status(404)
    }
})

app.get("/todo",async(req,res)=>{
    try{
        let finditems=await modelmate.find()
        res.status(201).json(finditems)
    }
    catch(err){
        console.log(error.message)
        res.status(404)
    }
})

app.put("/todo/:id",async(req,res)=>{
    try {
        let title=req.body.title
    let desc=req.body.desc
    let ids=req.params.id
    let updated=await modelmate.findByIdAndUpdate(
        ids,
        {
            id:ids,
            title,
            desc
        },
        {new:true}
    )
    res.status(201).json(updated)

        
    } catch (error) {
        console.log(error.message)
        res.status(404)        
    }
})


app.delete("/todo/:id",async(req,res)=>{
    try{
    let ids=req.params.id
    await modelmate.findByIdAndDelete(ids)
    res.status(204).end()

        
    } catch (error) {
        console.log(error.message)
        res.status(404)        
    }

})
app.use("/",(req,res)=>{
    res.send("<h1>This is the FINAL STAGE OF SSR:THE RISE</h1>")
}).listen(3000)