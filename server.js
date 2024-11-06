const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/api/best-bar', async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
            headers: {
                Authorization: `Bearer 9rfAEkq6_bP8GsfAdT-pG78px_fg1cPmnSyRv9qwwW3zwUSoi7b2xj7xvXOyG7UkjBO9m3DkOtiy3R555MraelZv5p_sEfmBrfzFysLw2WuEG4G36oTJ8zC2Y74pZ3Yx`, // Replace with your actual Yelp API key
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
      console.error('Error fetching data from Yelp API:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: error.response ? error.response.data : error.message });
      
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
