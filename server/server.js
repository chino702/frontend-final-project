const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors());

app.get('/api/rates', async (req, res) => {
  try {
    const pairs = 'EURUSD,EURGBP,GBPUSD,USDJPY,AUDUSD,USDCHF,NZDUSD,USDCAD,USDZAR';
    const apiUrl = `https://www.freeforexapi.com/api/live?pairs=${pairs}`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.code === 200) {
      res.status(200).json(data.rates);
    } else {
      res.status(500).json({ message: 'Failed to fetch exchange rates' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/rates/:pair', async (req, res) => {
  try {
    const pair = req.params.pair;
    const apiUrl = `https://www.freeforexapi.com/api/live?pairs=${pair}`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.code === 200) {
      res.status(200).json(data.rates[pair]);
    } else {
      res.status(500).json({ message: 'Failed to fetch exchange rate' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});