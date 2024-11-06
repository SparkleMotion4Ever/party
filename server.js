const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS for all origins
app.use(cors());
app.options('*', cors()); // Allow preflight requests for all routes

app.use(express.json());

// Use environment variable for the port, provided by Heroku
const PORT = process.env.PORT || 3000;

// API endpoint to fetch the best bar
app.post('/api/best-bar', async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`, // Uses environment variable for API key
      },
      params: {
        term: 'bars',
        latitude,
        longitude,
        sort_by: 'rating',
        limit: 1,
      },
    });

    const bestBar = response.data.businesses[0];
    res.json(bestBar);
  } catch (error) {
    console.error('Error fetching data from Yelp API:', error);
    res.status(500).send('Error fetching data from Yelp API');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
