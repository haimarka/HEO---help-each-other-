import mongo from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const MongoClient = mongo.MongoClient;
const objectID = mongo.ObjectId;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DATA_BASE = "freeToHelp";
const statisticsCollection = "statistics";

const addVolunteerToStatistics = async (volunteer) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(statisticsCollection);

    const result = await collection.findOne({ city: volunteer.city });

    if (result) {
      const update = await collection.updateOne(result, {
        $push: { volunteers: objectID(volunteer._id) },
      });
      console.log(update);
    } else {
      const insert = await collection.insertOne({
        city: volunteer.city,
        volunteers: [objectID(volunteer._id)],
        users: [],
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const addUsersToStatistics = async (user) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(statisticsCollection);

    const result = await collection.findOne({ city: user.city });

    if (result) {
      const update = await collection.updateOne(result, {
        $push: { users: objectID(user._id) },
      });

    } else {
      const insert = await collection.insertOne({
        city: user.city,
        volunteers: [],
        users: [objectID(user._id)],
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getLeadingCityOfVolunteers = async (req, res) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(statisticsCollection);

    const result = await collection.find({}).toArray();

    let max = result[0].volunteers.length;
    let city = result[0].city;
    for (let index = 0; index < result.length; index++) {
      if (result[index].volunteers.length > max) {
        max = result[index].volunteers.length;
        city = result[index].city;
      }
    }

    res.send({ city, max });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getLeadingCityOfUsers = async (req, res) => {
  const client = await MongoClient.connect(MONGO_URL).catch((err) => {
    throw err;
  });

  if (!client) {
    return;
  }

  try {
    const db = client.db(DATA_BASE);

    const collection = db.collection(statisticsCollection);

    const result = await collection.find({}).toArray();

    let max = result[0].users.length;
    let city = result[0].city;
    for (let index = 0; index < result.length; index++) {
      if (result[index].users.length > max) {
        max = result[index].users.length;
        city = result[index].city;
      }
    }

    res.send({ city, max });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

export {
  addVolunteerToStatistics,
  addUsersToStatistics,
  getLeadingCityOfVolunteers,
  getLeadingCityOfUsers,
};
