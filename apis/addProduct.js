const { ObjectId } = require("mongodb");
const connectDB = require("../db/dbConnect");

async function AddProduct(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('products');

        const { pPrice, pName, pDesc } = req.body;
        const pImg = req.file.filename;

        const userId = req.session.user.session._id

        if (req.session === null) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        } else
            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized User!" });
            } else if (!pPrice) {
                return res.status(400).json({ success: false, message: "price required fields!" });
            } else if (!pName) {
                return res.status(400).json({ success: false, message: "pname required fields!" });
            } else if (!pDesc) {
                return res.status(400).json({ success: false, message: "pdesc required fields!" });
            } else if (!pImg) {
                return res.status(400).json({ success: false, message: "pimg required fields!" });
            }


        await collection.insertOne({
            uid: ObjectId.createFromHexString(userId),
            pPrice,
            pName,
            pDesc,
            pImg
        });

        return res
            .status(201)
            .json({ success: true, message: "Product Added Successful" });
    } catch (error) {
        console.error("Product Add Failed:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { AddProduct };