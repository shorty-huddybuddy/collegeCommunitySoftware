import express from "express"
import cors from "cors"

const app=express()

app.use(cors())
app.use(express.json())

app.post("/" , (req,res) => {
    // console.log(req.body)
    res.send({
        name : req.body.name,
    })
})

app.listen(5000,function(){
    console.log("Listening on port 5000");
})