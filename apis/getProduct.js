const { ObjectId } = require("mongodb");
const connectDB = require("../db/dbConnect");

async function GetProduct(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('products');

        if (!req.session.user) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }
        
        const userId = req.session.user.session._id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }

        const userProducts = await collection.find({ uid: ObjectId.createFromHexString(userId) }).toArray();

        if (userProducts.length === 0) {
            return res.status(404).json({ success: false, message: "Product Not Found" });
        } else {
            return res.status(200).json({ success: true, products: userProducts });
        }

    } catch (error) {
        console.error("Fetch Product Failed:", error);
        return res.status(500).json({ success: false, error: "Fetch Product Failed" });
    }
}

module.exports = { GetProduct };