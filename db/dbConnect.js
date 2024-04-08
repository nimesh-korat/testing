const MongoClient = require('mongodb').MongoClient;

//MongoDB Connection
const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    console.log("DB Connected!");
    return client.db(); // Return the database object for further usage
  } catch (error) {
    console.log("DB Connection Error: ", error);
    throw error;
  }
};

module.exports = connectDB;