const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors({ origin: '*' }));
app.options('*', cors());

app.use(express.json());

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// API endpoint to fetch the best bar
app.post('/api/best-bar', async (req, res) => {
  console.log('Received request at /api/best-bar');
  const { latitude, longitude } = req.body;

  // Remaining code for fetching data from Yelp API...
});


  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer 9rfAEkq6_bP8GsfAdT-pG78px_fg1cPmnSyRv9qwwW3zwUSoi7b2xj7xvXOyG7UkjBO9m3DkOtiy3R555MraelZv5p_sEfmBrfzFysLw2WuEG4G36oTJ8zC2Y74pZ3Yx`, // Replace with your Yelp API key
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
