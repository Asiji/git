const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // store files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // rename the file to avoid conflicts
    }
});

const upload = multer({ storage: storage });

// Serve static files (images) from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.send('No file uploaded.');
    }
    // Return the URL of the uploaded image
    res.send(`
        <h2>File Uploaded Successfully!</h2>
        <img src="/uploads/${req.file.filename}" alt="Uploaded Image" style="max-width: 100%; height: auto;">
        <p><a href="/">Go back</a></p>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
