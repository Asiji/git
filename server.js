const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});


const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedFileTypes = /jpg|jpeg|png|txt|pdf/;
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedFileTypes.test(file.mimetype);

        if (extname && mimeType) {
            return cb(null, true);
        } else {
            cb(new Error('Only .jpg, .jpeg, .png, .txt, .pdf files are allowed.'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 } 
}).single('file'); 

app.use(express.static('public'));


app.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).send({ error: err.message });
        }
        res.send('File uploaded successfully!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
