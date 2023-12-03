const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const detectTextByDocument = require('./Convert_image/detectText.js')
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage: storage });

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/Static/index.html'));
});
// Handle file upload
app.post('/submit-form', upload.single('image'), async (req, res) => {
    // Access uploaded image from req.file.buffer
    const imageData = req.file.buffer;
  
    const data = await detectTextByDocument(imageData);
  
    console.log(data);
  
    res.send(`<div>response get</div>`);
  });
  // Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});