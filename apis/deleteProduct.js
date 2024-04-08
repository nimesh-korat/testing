const { ObjectId } = require("mongodb");
const connectDB = require("../db/dbConnect");

async function DeleteProduct(req, res) {
    try { 
        const db = await connectDB();
        const collection = db.collection('products');

        if (!req.session || !req.session.user || !req.session.user.session || !req.session.user.session._id) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }

        const userId = req.session.user.session._id;
        const { pId } = req.body; // Assuming productId is passed in the request URL

        const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(pId), uid: ObjectId.createFromHexString(userId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Product not found or you are not authorized to delete this product." });
        }

        return res.status(200).json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        console.error("Delete Product Failed:", error);
        return res.status(500).json({ success: false, error: error });
    }
}

module.exports = { DeleteProduct };
