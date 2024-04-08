const { ObjectId } = require("mongodb");
const connectDB = require("../db/dbConnect");

async function EditProduct(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('products');

        if (!req.session.user) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }
        const userId = req.session.user.session._id;
        console.log(userId);

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }


        const { pId, pPrice, pName, pDesc } = req.body;
        const pImg = req.file ? req.file.filename : null;

        if (!pPrice && !pName && !pDesc && !pImg) {
            return res.status(400).json({ success: false, message: "No fields to update." });
        }

        const updatedFields = {};

        if (pPrice) {
            updatedFields.pPrice = pPrice;
        }
        if (pName) {
            updatedFields.pName = pName;
        }
        if (pDesc) {
            updatedFields.pDesc = pDesc;
        }
        if (pImg) {
            updatedFields.pImg = pImg;
        }



        const result = await collection.updateOne(
            {
                _id: ObjectId.createFromHexString(pId),
                uid: ObjectId.createFromHexString(userId)
            },
            { $set: updatedFields }
        );

        if (result.modifiedCount === 0) {
            return res.status(402).json({ success: false, message: "No Changes Done" });
        }

        return res.status(200).json({ success: true, message: "Product details updated successfully." });
    } catch (error) {
        console.error("Edit Product Failed:", error);
        return res.status(500).json({ success: false, error: "Edit Product Failed" });
    }
}

module.exports = { EditProduct };
