const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const yelpApiKey = process.env.YELP_API_KEY;

// Enable CORS with specific options
app.use(cors());

// Middleware to parse JSON bodies


app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);
});
app.use(express.json());
// Use environment variable for the port, p

// Root route to handle GET requests at the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Yelp Best Bar API!');
});

// API endpoint to fetch the best bar
app.post('/api/best-bar', async (req, res) => {
  const { latitude, longitude } = req.body;
  
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${yelpApiKey}`
      },
      params: {
        term: 'bars',
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        sort_by: 'rating',
        limit: 1
      }
    });

    if (response.data.businesses.length === 0) {
      return res.status(404).json({ error: 'No bars found' });
    }

    const bestBar = response.data.businesses[0];
    res.json(bestBar);
  } catch (error) {
    console.error('Error fetching data from Yelp API:', error.response ? error.response.data : error.message);
    res.status(500).send('Error fetching data from Yelp API');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
