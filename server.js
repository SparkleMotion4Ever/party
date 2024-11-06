const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express(); // Initialize 'app' immediately

// Enable CORS with specific options
app.use(cors({ origin: '*' }));
app.options('*', cors()); // Allow preflight requests for all routes

// Middleware to parse JSON bodies
app.use(express.json());

// Use environment variable for the port, provided by Heroku
const PORT = process.env.PORT || 3000;

// API endpoint to fetch the best bar
app.post('/api/best-bar', async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log("Latitude:", latitude, "Longitude:", longitude); // Log parameters to confirm values

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer 9rfAEkq6_bP8GsfAdT-pG78px_fg1cPmnSyRv9qwwW3zwUSoi7b2xj7xvXOyG7UkjBO9m3DkOtiy3R555MraelZv5p_sEfmBrfzFysLw2WuEG4G36oTJ8zC2Y74pZ3Yx`, // Replace with your actual API key
      },
      params: {
        term: 'bars',
        latitude: parseFloat(latitude),  // Ensure latitude is a number
        longitude: parseFloat(longitude), // Ensure longitude is a number
        sort_by: 'rating',
        limit: 1,
      },
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
