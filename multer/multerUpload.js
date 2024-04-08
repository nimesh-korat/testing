const multer = require("multer");

//profile pic storage
const profilePicStorage = multer.diskStorage({

    //path to store the profilePic
    destination: (req, file, cb) => {
        cb(null, "../frontend/src/images/profilePics");
    },

    //filename to give to the profilePic
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const profilePicUpload = multer({ storage: profilePicStorage });

//product pic storage
const productPicStorage = multer.diskStorage({

    //path to store the profilePic
    destination: (req, file, cb) => {
        cb(null, "../frontend/src/images/productPics");
    },

    //filename to give to the profilePic
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const productPicUpload = multer({ storage: productPicStorage });

//edit product pic storage
const editProductPicStorage = multer.diskStorage({

    //path to store the profilePic
    destination: (req, file, cb) => {
        cb(null, "../frontend/src/images/productPics");
    },

    //filename to give to the profilePic
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const editProductPicUpload = multer({ storage: editProductPicStorage });


module.exports = { profilePicUpload, productPicUpload, editProductPicUpload }