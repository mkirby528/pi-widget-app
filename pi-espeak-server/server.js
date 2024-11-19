const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint to handle text-to-speech
app.post('/speak', (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required for speech synthesis' });
    }

    // Use eSpeak-ng to speak the text
    exec(`espeak-ng "${text}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: `eSpeak-ng error: ${stderr || error.message}` });
        }
        // Successful execution
        res.json({ message: 'Speech synthesis started' });
    });
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
