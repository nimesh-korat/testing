const connectDB = require("../db/dbConnect");

async function SignUpApi(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('users');

        const { email, phone, password, role } = req.body;
        const profilePic = req.file.filename;
        console.log(req.file);
        console.log(req.body);

        if (!email) {
            return res.status(400).json({ success: false, message: "email required fields!" });
        } else if (!phone) {
            return res.status(400).json({ success: false, message: "phone required fields!" });
        } else if (!password) {
            return res.status(400).json({ success: false, message: "password required fields!" });
        } else if (!role) {
            return res.status(400).json({ success: false, message: "role required fields!" });
        } else if (!profilePic) {
            return res.status(400).json({ success: false, message: "profilePic required fields!" });
        }

        const userExist = await collection.findOne({ email });
        console.log("UserExist:", userExist);

        if (userExist) {
            return res
                .status(400)
                .json({ success: false, message: "Email Already Exist!" });
        }

        // Create a unique index on the email field if it doesn't already exist
        await collection.createIndex({ email: 1 }, { unique: true, required: true });


        await collection.insertOne({
            email,
            phone,
            password,
            role,
            profilePic
        });

        return res
            .status(201)
            .json({ success: true, message: "Registration Successful" });
    } catch (error) {
        console.error("Registration Failed:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { SignUpApi };