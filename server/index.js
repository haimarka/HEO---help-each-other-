<<<<<<< HEAD
import express from "express" 
import cors from "cors"
import bodyParser from "body-parser"
const app = express() ,

PORT = process.env.PORT || 5000;

app.use(cors({origin:'*'}))

app.use(bodyParser.json())

=======
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import mongo from "mongodb";
const MongoClient = mongo.MongoClient;
const objectID = mongo.ObjectId;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DATA_BASE = "freeToHelp";

import { register } from "./utils/register.js";

const app = express();
app.use(express.json());
>>>>>>> 5319d014dbcac26c5200248a1be9e629574ae888

app.post("/register/volunteer", (req, res) => {
  register(req, res);
});

app.post("/register/client", (req, res) => {
  register(req, res);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is loading ...... ${PORT}`);
});
