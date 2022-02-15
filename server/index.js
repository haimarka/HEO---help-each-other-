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

import { register } from "./utils/register.js";

const app = express();
app.use(express.json());

app.post("/register/volunteer", (req, res) => {
  register(req, res);
});

app.post("/register/client", (req, res) => {
  register(req, res);
});

app.listen(PORT, () => {
  console.log(`server is loading ...... ${PORT}`);
});
