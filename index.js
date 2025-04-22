// index.js
import express from 'express';
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/wbhk', (req, res) => {
  console.log('🔔 Webhook payload:', req.body);
  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
