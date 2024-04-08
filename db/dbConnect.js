const MongoClient = require('mongodb').MongoClient;

//MongoDB Connection
const connectDB = async () => {
  try {
    const client = await MongoClient.connect('mongodb+srv://koratnimesh30:Nimesh123@cluster0.ayot4f5.mongodb.net/Products');
    console.log("DB Connected!");
    return client.db(); // Return the database object for further usage
  } catch (error) {
    console.log("DB Connection Error: ", error);
    throw error;
  }
};

module.exports = connectDB;