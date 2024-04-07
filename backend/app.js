import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { defaultImage } from "./defaultImage.js"

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
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  photoURL : {
    type : String,
    default : `${defaultImage}`
  },
  about : {
    type : String,
  },
  passoutYear : {
    type : Number,
  },
  phoneNumber : {
    type : Number,
    required : true,
    unique : true,
    min: -9007199254740991, // minimum value for int64
    max: 9007199254740991
  }
})

const User = mongoose.model('User', UserSchema)

const QuerySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  queryMessage: {
    type: String,
    required: true,
  }
})

const Query = mongoose.model('Query' , QuerySchema)

const BloodRequestSchema = new mongoose.Schema({
  BGType : {
    type : String ,
    required : true
  },
  userRequested : {
    type : Object,
    required : true
  },
  timeRequested : {
    type : Date,
    default : Date.now()
  },
  fulfilled : {
    type : Boolean,
    default : false,
  },
  userDonated : {
    type : Object
  }
})

const BloodRequest = mongoose.model('Blood Request' , BloodRequestSchema)

const NotificationSchema = new mongoose.Schema({
  message : {
    type : String,
    required : true
  },
  link : {
    type : String,
  },
  usersToBeNotified : {
    type : Array,
    default : []
  },
  userWhoSent : {
    type : Object,
    required : true,
  },
  time : {
    type : Date,
    default : Date.now()
  }
})

const Notification = mongoose.model('Notification' , NotificationSchema)

const app=express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.listen(5000,function(){
  console.log("Listening on port 5000");
})

app.post("/" , (req,res) => {
    res.send({
        name : req.body.name,
    })
})

app.post("/auth/create-user" , async (req,res) => {

    // Validate request body
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message : "Name, email, and password are required fields",
      });
    }
    
  
    // Create a new user
    const user = new User({
      name: req.body.name,
      phoneNumber : req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
    });
  
    try {
      // Save the user to the database
      const result = await user.save();
      
      return res.status(201).send({
        message: "User created successfully",
        user: result,
      });
    } catch (error) {
      // Handle errors
      if (error.code === 11000) {
        // Duplicate email error
        return res.status(400).send({
          message : "Email already exists",
        });
      }
      return res.status(500).send({
        message : "Failed to create user",
      });
    }
});

app.post("/auth/signin" , async (req, res) => {

  const { email, password } = req.body

  if ( !email || !password) {
    return res.status(400).send({
      error: "Email, and password are required fields"
    })
  }

  try{

    const user = await User.findOne({ email})

    if(!user || user.password != password){
      return res.status(404).send({
        message : 'Invalid credentials'
      })
    }

    return res.status(200).send({
      message : 'User logged in  successfully',
      user : user
    })
  }
  catch(error) {
    return res.status(500).send({
      message : 'Failed to sign in'
    })
  }

})



app.post("/contact-us" , async (req,res) => {

  const { email , query : queryMessage } = req.body

  if(!email || !queryMessage){
    return res.status(400).send({
      message : 'Fill all the fields'
    })
  }

  const query = new Query({
    email : email,
    queryMessage : queryMessage
  })

  try{
    const data = await query.save()
    return res.status(201).send({
      message : 'Query raised successfullly... We will email you back soon'
    })
  }
  catch(error) {
    console.log(error)
    return res.status(500).send({
      message : 'Internal server error... Could not raise query'
    })
  }

})

app.get("/profile" , async (req,res) => {

  const { user } = req.query

  if(!user){
    return res.status(400).send({
      message : 'Fill all fields'
    })
  }

  
  try{

    const user_from_database = await User.findOne({ email : user})

    // console.log(user_from_database)
  
    if(!user_from_database){
      return res.status(401).send({
        message : 'This is not a registered user'
      })
    }

    res.status(201).send({
      message : 'User found',
      user : user_from_database
    })
    
  }
  catch(error){
    return res.status(500).send({
      message : 'Internal server occurred while fetching user profile'
    })
  }
})

app.put("/user/updateAbout" , async (req, res) => {
  const { email , profileAboutData } = req.body

  if(!email || !profileAboutData){
    return res.status(400).send({
      message : 'All fields are necessary'
    })
  }

  const user = await User.findOne( { email })

  if(!user){
    return res.status(401).send({
      message : 'No such user found'
    })
  }

  try{
    await User.findOneAndUpdate(
      {email : email},
      {about : profileAboutData},
      {new : true}
    )

    return res.status(201).send({
      message : 'About has been updated',
      profileAboutData
    })

  }
  catch(error){
    return res.status(500).send({
      message : 'Internal server error'
    })
  }

})

app.put("/user/updateYear" , async (req, res) => {
  const { email , passoutYear} = req.body

  if(!email || !passoutYear){
    return res.status(400).send({
      message : 'All fields are necessary'
    })
  }

  const user = await User.findOne( { email })

  if(!user){
    return res.status(401).send({
      message : 'No such user found'
    })
  }

  try{
    await User.findOneAndUpdate(
      {email : email},
      {passoutYear : passoutYear},
      {new : true}
    )

    return res.status(201).send({
      message : 'Passout year has been updated',
      passoutYear
    })

  }
  catch(error){
    return res.status(500).send({
      message : 'Internal server error'
    })
  }

})

app.put("/user/updatePhone" , async (req, res) => {
  const { email , phoneNumber} = req.body

  if(!email || !phoneNumber){
    return res.status(400).send({
      message : 'All fields are necessary'
    })
  }

  const user = await User.findOne( { email })

  if(!user){
    return res.status(401).send({
      message : 'No such user found'
    })
  }

  try{
    await User.findOneAndUpdate(
      {email : email},
      {phoneNumber : phoneNumber},
      {new : true}
    )

    return res.status(201).send({
      message : 'Phone Number has been updated',
      phoneNumber
    })

  }
  catch(error){
    return res.status(500).send({
      message : 'Internal server error'
    })
  }

})

app.put("/user/updateImage" , async (req, res) => {
  const { email , imageURL} = req.body

  if(!email || !imageURL){
    return res.status(400).send({
      message : 'All fields are necessary'
    })
  }

  const user = await User.findOne( { email })

  if(!user){
    return res.status(401).send({
      message : 'No such user found'
    })
  }

  try{
    await User.findOneAndUpdate(
      {email : email},
      {photoURL : imageURL},
      {new : true}
    )

    return res.status(201).send({
      message : 'Photo has been updated',
      imageURL
    })

  }
  catch(error){
    return res.status(500).send({
      message : 'Internal server error'
    })
  }

})

app.get("/search" , async (req , res) => {

  const { query }  = req.query

  try{
    // Use a regular expression to perform a case-insensitive search for the name substring
    const users = await User.find({ name: { $regex: query, $options: 'i' } })

    res.status(201).send({
      message : `Search Request fulfilled` , 
      users
    })

  }
  catch(error){
    console.log(error)
    res.status(500).send({
      message : 'Internal server error'
    })
  }

})

app.post("/requestBlood" , async(req,res) => {
  const { BGType , user } = req.body
  try{
    
    const bgRequest = new BloodRequest({
      BGType : BGType,
      userRequested : user
    })

    const BGRequest = await bgRequest.save()

    res.status(201).send({
      message : 'A request has been put',
      BGRequest
    })

  }
  catch(error){
    console.log(error)
    res.status(500).send({
      message : 'Internal Server Error'
    })
  }
})

app.get("/findBloodRequests" , async(req, res) => {

  try{

    const bloodRequests = await BloodRequest.find({}).sort({ fulfilled : 1 }).sort({ timeRequested : -1 })

    res.status(201).send({
      message : 'Found blood requests',
      bloodRequests
    })

  }
  catch(error){
    console.log(error)
    res.status(500).send({
      message : 'Internal Server Error'
    })
  }
})

app.put("/updateBloodRequest" , async(req, res) => {

  const { id , user } = req.body

  try{
    await BloodRequest.findOneAndUpdate(
      {_id : id},
      {fulfilled : true},
      {new : true}
    )
    await BloodRequest.findOneAndUpdate(
      {_id : id},
      {userDonated : user},
      {new : true}
    )

    res.status(201).send({
      message : 'Donate request processed... The receiver will be notified'
    })

  }
  catch(error){
    console.log(error)
    res.status(500).send({
      message : 'Internal server error'
    })
  }

})

app.post("/veiwUserBloodRequests" , async (req, res) => {

  const { user_email } = req.body

  try{

    const responses = await BloodRequest.find({ 'userRequested.email' : user_email })

    res.status(201).send({
      message : 'Found your responses' , 
      responses
    })

  }
  catch(error){
    console.log(error)
    res.status(500).send({
      message : 'Internal Server Error'
    })
  }

})

app.post("/sendNotification" , async(req,res) => {
  const { message , users , user , link } = req.body

  try{

    const notification = new Notification({
      message : message,
      userWhoSent : user,
      usersToBeNotified : users,
      link : link
    })

    const response = await notification.save()

    res.status(201).send({
      message : 'Notification sent',
      response
    })

  }
  catch(error){
    console.log(error)
    res.status(500).send({
      message : 'Internal Server Error'
    })
  }

})



app.post("/viewNotifications" , async(req,res) => {

  const { user_email } = req.body

  try{

    let allNotifications = await Notification.find({}).sort({ time : -1 })
    let notifications = []
    allNotifications.map((notification) => {
      notification.usersToBeNotified.map((user) => {
        if(user.email == user_email){
          notifications.push(notification)
        }
      })
    })

    res.status(201).send({
      message : 'Notifications received successfully',
      notifications
    })

  }
  catch(error){
    console.log(error)
    res.status(500).send({
      message : 'Internal Server Error'
    })
  }

})