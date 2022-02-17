import mongo from "mongodb";
import dotenv from "dotenv";
import { addUsersToStatistics } from "./statistics.js";

dotenv.config();
const MongoClient = mongo.MongoClient;
const objectID = mongo.ObjectId;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DATA_BASE = "freeToHelp";
const clientCollection = "clients";

async function clientRegister(req, res) {
  const client = await MongoClient.connect(MONGO_URL);
  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);
    const foundResult = await db
      .collection(clientCollection)
      .findOne({ phoneNumber: req.body.phoneNumber });

    if (foundResult) {
      const updateResult = await db
        .collection(clientCollection)
        .updateOne(
          { phoneNumber: req.body.phoneNumber },
          { $push: { occupation: req.body.occupation } }
        );
      addUsersToStatistics(foundResult);
      res.sendStatus(201);
    } else {
      const user = { phoneNumber: req.body.phoneNumber, city: req.body.city };
      user.occupation = [req.body.occupation];
      const insertResult = await db
        .collection(clientCollection)
        .insertOne(user);
      res.sendStatus(201);
      const userData = findUser(insertResult.insertedId);
      addUsersToStatistics(userData);
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
}

const findUser = async (id) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(clientCollection);

    const result = await collection.findOne({ _id: objectID(id) });

    return result;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

export { clientRegister };
