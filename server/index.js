import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import mongo from "mongodb";
const MongoClient = mongo.MongoClient;
const objectID = mongo.ObjectId;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DATA_BASE = "freeToHelp";
const PORT = process.env.PORT || 5000;
// good lock

import { registerVolunteers ,clientRegister} from "./utils/register.js";
import {creatOccupation} from "./utils/occupations.js"

const app = express();
app.use(express.json());


app.get("/api",(req,res)=>{
  creatOccupation(req,res)
})


app.post("/register/volunteer", (req, res) => {
  registerVolunteers(req, res);
});

app.post("/register/client", (req, res) => {
  clientRegister(req, res);
});




app.listen(PORT, () => {
  console.log(`server is loading ...... ${PORT}`);
});
