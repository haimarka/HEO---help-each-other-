import mongo from "mongodb";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const MongoClient = mongo.MongoClient;
const objectID = mongo.ObjectId;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DATA_BASE = "freeToHelp";
const dataCollection = "data";

const dataJson = fs.readFileSync("./public/data.json", "utf8");
const data = JSON.parse(dataJson);

const createData = async (req, res) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(dataCollection);

    const result = await collection.insertOne(data);

    res.status(201).send(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getData = async (req, res) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(dataCollection);

    const result = await collection.find({}).toArray();

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

export { createData, getData };
