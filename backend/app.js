import express from "express"
import cors from "cors"
import mongoose from "mongoose"

mongoose.connect('mongodb://localhost:27017/').then(() => console.log('Connected to database')).catch((error) => console.log(error))

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  }
});

const User = mongoose.model('User', UserSchema);

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