// index.js
import express from 'express';
import {completeTaskByAI} from './pneumatic.js';
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/wbhk', async (req, res) => {
  console.log('🔔 Webhook payload:', req.body);
  res.json({ received: true });
  const result = await completeTaskByAI({dataFromPneumatic: req.body})
  console.log(result);
});

app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
