const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Replace 'YOUR_YELP_API_KEY' with your actual Yelp API Key
const YELP_API_KEY = '9rfAEkq6_bP8GsfAdT-pG78px_fg1cPmnSyRv9qwwW3zwUSoi7b2xj7xvXOyG7UkjBO9m3DkOtiy3R555MraelZv5p_sEfmBrfzFysLw2WuEG4G36oTJ8zC2Y74pZ3Yx';

app.use(cors());
app.use(express.json());

app.post('/api/best-bar', async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
            Authorization: 'Bearer 9rfAEkq6_bP8GsfAdT-pG78px_fg1cPmnSyRv9qwwW3zwUSoi7b2xj7xvXOyG7UkjBO9m3DkOtiy3R555MraelZv5p_sEfmBrfzFysLw2WuEG4G36oTJ8zC2Y74pZ3Yx',
          },
          
      params: {
        term: 'bars',
        latitude: latitude,
        longitude: longitude,
        sort_by: 'rating',
        limit: 1,
      },
    });

    const bestBar = response.data.businesses[0];
    res.json(bestBar);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from Yelp API');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
