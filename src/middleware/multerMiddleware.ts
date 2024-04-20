import multer from 'multer';
import path from 'path';

// Define storage configuration for multer
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'Images'); // Specify the directory where uploaded files will be stored
    },
    filename: (_, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname)); // Specify how uploaded files will be named
    }
});

// Initialize multer with the defined storage configuration
const upload = multer({ storage: storage });

export default upload;
