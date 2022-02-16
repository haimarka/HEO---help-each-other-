import mongo from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const MongoClient = mongo.MongoClient;
const objectID = mongo.ObjectId;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DATA_BASE = "freeToHelp";
const volunteerCollection = "volunteers";

const registerVolunteers = async (req, res) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(volunteerCollection);

    const volunteer = req.body;

    const result = await collection.insertOne(volunteer);

    res.status(201).send(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const searchVolunteer = async (req, res) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(volunteerCollection);

    const city = req.params.city;
    const occupation = req.params.occupation;

    const result = await collection.find({ city, occupation }).toArray();

    if (result.length) {
      res.status(200).send(result);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

// const searchByCity = async (req, res) => {
//     const client = await MongoClient.connect(MONGO_URL).catch((err) => {
//       throw err;
//     });
  
//     if (!client) {
//       return;
//     }
  
//     try {
//       const db = client.db(DATA_BASE);
  
//       const collection = db.collection(volunteerCollection);
  
//       const city = req.body.city;
  
//       const result = await collection.find(city).toArray();
  
//       res.status(201).send(result);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       client.close();
//     }
//   };
  
//   const searchOccupation = async (req, res) => {
//     const client = await MongoClient.connect(MONGO_URL).catch((err) => {
//       throw err;
//     });
  
//     if (!client) {
//       return;
//     }
  
//     try {
//       const db = client.db(DATA_BASE);
  
//       const collection = db.collection(occupationCollection);
  
//       const occupation = req.body.occupation;
  
//       const result = await collection.find(occupation).toArray();
  
//       res.status(201).send(result);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       client.close();
//     }
//   };

export { registerVolunteers, searchVolunteer };
