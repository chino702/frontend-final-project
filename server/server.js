const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.get('/api/rates', async (req, res) => {
  try {
    const pairs = 'EURUSD,EURGBP,GBPUSD,USDJPY,AUDUSD,USDCHF,NZDUSD,USDCAD,USDZAR';
    const apiUrl = `https://www.freeforexapi.com/api/live?pairs=${pairs}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});