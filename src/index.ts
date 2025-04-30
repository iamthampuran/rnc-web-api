import express from 'express';
import bodyParser from 'body-parser';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});