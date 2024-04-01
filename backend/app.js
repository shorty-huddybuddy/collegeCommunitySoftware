import express from "express"
import cors from "cors"


const app=express()

app.use(cors())
app.use(express.json())

app.post("/" , (req,res) => {
    res.send({
        name : req.body.name,
    })
})

app.post("/auth/create-user" , (req,res) => {

    res.status(200).send({})
})

app.listen(5000,function(){
    console.log("Listening on port 5000");
})