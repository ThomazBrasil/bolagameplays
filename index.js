const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Proxy route
app.post('/webhook', async (req, res) => {
    const { url, content } = req.body;

    if (!url || !content) {
        return res.status(400).json({ error: 'Missing "url" or "content"' });
    }

    try {
        const response = await axios.post(url, { content });
        res.status(200).json({ message: 'Message sent successfully', data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
