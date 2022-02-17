import mongo from "mongodb";
import bcrypt from "bcryptjs"
import dotenv from "dotenv";
dotenv.config();
const MongoClient = mongo.MongoClient;
const objectID = mongo.ObjectId;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DATA_BASE = "freeToHelp";
const volunteerCollection = "volunteers";
const clientCollection = "clients";


const registerVolunteers = async (req, res) => {
  // const client = await MongoClient.connect(MONGO_URL).catch((err) => {
  //   throw err;
  // });

  // if (!client) {
  //   return;
  // }

  // try {
    // const db = client.db(DATA_BASE);

    // const collection = db.collection(volunteerCollection);

    const pass = req.body.password
   
    const hashPass = await bcrypt.hash(pass,12)
    console.log(hashPass);
   

    // const result = await collection.insertOne();

  //   res.status(201).send(result);
  // } catch (err) {
  //   console.log(err);
  // } finally {
  //   client.close();
  // }
};

async function clientRegister(req, res) {
  const client = await MongoClient.connect(MONGO_URL);
  if (!client) {
    return;
  }

  try {
    console.log("Connected correctly to server");
    const db = client.db(DATA_BASE);
    const foundResult = await db
      .collection(clientCollection)
      .findOne({ phoneNumber: req.body.phoneNumber });
    console.log(foundResult);

    if (foundResult) {
      console.log("found");
      const updateResult = await db
        .collection(clientCollection)
        .updateOne(
          { phoneNumber: req.body.phoneNumber },
          { $push: { occupation: req.body.occupation } }
        );
      console.log(updateResult);
      res.sendStatus(201);
    } else {
      const user = {};
      user.phoneNumber = req.body.phoneNumber;
      user.occupation = [req.body.occupation];
      console.log("not found");
      const insertResult = await db
        .collection(clientCollection)
        .insertOne(user);
      console.log(insertResult);
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err.stack);
  }

  client.close();
}

export { registerVolunteers, clientRegister };
