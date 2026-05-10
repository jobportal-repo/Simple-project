//import packages
const express=require("express");
const cors=require("cors");

const app=express();

//middleware

app.use(cors());
app.use(express.json());

//fake database array
let users=[];

//GET route->all users
app.get("/users",(req,res)=>{
    res.json(users);
})

//post route->add new user
app.post("/add-user",(req,res)=>{
    const {name,email,password}=req.body;
    const user={name,email,password};
    users.push(user);
    res.json(user)
})

//start server
app.listen(5000,()=>{console.log("Backend running")})