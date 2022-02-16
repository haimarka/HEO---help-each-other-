import mongo from "mongodb";
import fs from "fs"
import dotenv from "dotenv";
dotenv.config();
const MongoClient = mongo.MongoClient;
const objectID = mongo.ObjectId;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DATA_BASE = "freeToHelp";
const  occupationCollection = "occupation"


 const occupationDataJson = fs.readFileSync("./public/data.json", "utf8");
 const occupationData = JSON.parse(occupationDataJson); 
console.log(occupationData);


const creatOccupation = async (req, res) => {
    const client = await MongoClient.connect(MONGO_URL).catch((err) => {
      throw err;
    });
  
    if (!client) {
      return;
    }
  
    try {
      const db = client.db(DATA_BASE);
  
      const collection = db.collection(occupationCollection);
  
      const result = await collection.insertOne(occupationData);
  
      res.status(201).send(result);
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  };
  
  

  export {
    creatOccupation
  }