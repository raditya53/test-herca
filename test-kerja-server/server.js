const express = require('express');
const cors = require('cors');
const applyCommissionToMarketingData = require('./applyCommission.js');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Endpoint to retrieve commission data
app.get('/commission-data', async (req, res) => {
  try {
    const commissionData = await applyCommissionToMarketingData();
    res.json(commissionData);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// Endpoint to update payment status based on payment amount
app.post('/update-payment', async (req, res) => {
    try {
      const { MarketingName, Month, paymentAmount } = req.body;
      const commissionData = await applyCommissionToMarketingData();
  
      const marketingEntry = commissionData.find(entry => entry.MarketingName === MarketingName && entry.Month === Month);
  
      if (!marketingEntry) {
        return res.status(404).json({ error: 'Marketing entry not found' });
      }
  
      const revenue = parseInt(marketingEntry.revenue.replace(/[^\d]/g, '').slice(0, -2));
  
      // Update the payment status if the payment amount matches the revenue
      if (paymentAmount === revenue) {
        // Update the payment status in the commissionData array
        marketingEntry.status = true; // Set status menjadi true
        // Return the updated commission data
        res.json({ message: 'Payment status updated successfully', commissionData: commissionData });
      } else {
        res.status(400).json({ error: 'Payment amount does not match the revenue' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'An error occurred while updating payment status' });
    }
  });
  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });