import express from "express";

const app = express() ,

PORT = process.env.PORT || 5000


app.get('/',(req,res)=>{
    res.send("hello")
    console.log('hello!!');
})



app.listen( PORT ,()=>{
    console.log(`server is loading ...... ${PORT}`);
})