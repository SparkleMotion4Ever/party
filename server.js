const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Enable CORS with specific options
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
// Middleware to parse JSON bodies
app.use(express.json());

// Use environment variable for the port, provided by Heroku
const PORT = process.env.PORT || 3000;
const yelpApiKey = process.env.YELP_API_KEY;

// Root route to handle GET requests at the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Yelp Best Bar API!');
});

// API endpoint to fetch the best bar
app.post('/api/best-bar', async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log("Latitude:", latitude, "Longitude:", longitude); // Log parameters to confirm values

  try {
    const yelpApiKey = process.env.YELP_API_KEY;
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
