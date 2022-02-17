import mongo from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import { addVolunteerToStatistics } from "./statistics.js";

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

    const hashPasswrd = await bcrypt.hash(volunteer.password, 12);

    volunteer.password = hashPasswrd;

    const result = await collection.insertOne(volunteer);

    const volunteerData = await findVolunteer(result.insertedId);

    addVolunteerToStatistics(volunteerData);

    res.status(201).send(result);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const loginVolunteers = async (req, res) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(volunteerCollection);

    const phoneNumber = req.body.phoneNumber;

    const result = await collection.findOne({ phoneNumber });

    bcrypt.compare(req.body.password, result.password, (error, response) => {
      if (response) {
        res.status(200).send(result);
      } else {
        res.sendStatus(401);
      }
    });
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

    // const result = await collection.find({ city, occupation }).toArray();
    const result = await collection.find({ city }).toArray();

    const list = new Array();

    for (let index = 0; index < result.length; index++) {

      if (result[index].occupation.includes(occupation) || result[index].occupation.includes("other")) {
        list.push(result[index]);
      }
    }

    if (list.length) {
      res.status(200).send(list);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getVolunteers = async (req, res) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(volunteerCollection);

    const result = await collection.find({}).toArray();

    console.log(result);

    res.send(result);
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

const findVolunteer = async (id) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(volunteerCollection);

    const result = await collection.findOne({ _id: objectID(id) });

    return result;
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

export {
  registerVolunteers,
  searchVolunteer,
  getVolunteers,
  loginVolunteers,
  findVolunteer,
};
