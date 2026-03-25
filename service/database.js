const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('whatsyourschedule');
const userCollection = db.collection('user');
const eventCollection = db.collection('event');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Successfully Connected to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

async function clearDatabase() {
  userCollection.drop();
  eventCollection.drop();
}

function findUser(field, value) {
  return userCollection.findOne({ [field]: value });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ username: user.username }, { $unset: { authToken: 1 } });
}

function getEvents(eventIDs) {
  return eventCollection.find({ eventID: {$in: [...eventIDs]} }).toArray();
}

function findEvent(field, value) {
  return eventCollection.findOne({ [field]: value });
}

async function createEvent(event) {
  await eventCollection.insertOne(event);
}

module.exports = {
  clearDatabase,
  findUser,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  getEvents,
  findEvent,
  createEvent,
};
