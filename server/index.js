import express from "express";

const app = express() ,

PORT = process.env.PORT || 5000


app.get('/',(req,res)=>{
    res.send("hello")
    console.log('hello!!');
});

app.get("/click", (req, res) => {
    console.log("the button was clicked");
})

app.listen( PORT ,()=>{
    console.log(`server is loading ...... ${PORT}`);
})