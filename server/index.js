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
import userRoutes from "./routes/user";
import { registerVolunteers, clientRegister } from "./utils/user.js";
import { searchByCity } from "./utils/search.js";
import { creatData } from "./utils/data.js";

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  console.log("working post");
});

app.use("/register", userRoutes);

app.get("/api", (req, res) => {
  creatData(req, res);
});

app.get("/volunteer/:city", (req, res) => {
  searchByCity(req, res);
});

app.post("/register/volunteer", (req, res) => {
  registerVolunteers(req, res);
});

app.post("/register/client", (req, res) => {
  clientRegister(req, res);
});

app.listen(PORT, () => {
  console.log(`server is loading ...... ${PORT}`);
});
