import express from 'express';
import bodyParser from 'body-parser';
import signup from './routes/auth.routes'; // Adjust the path as necessary
import getBranches  from './routes/lookup.routes'; // Adjust the path as necessary
import cors from 'cors';
import sequelize from './config/database';
import addPublication from './routes/publication.routes'; // Adjust the path as necessary

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


//enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(bodyParser.json());

//connect to database
  sequelize.authenticate().then(() => {
    console.log('✅ Connected to SQL Server');
  }).catch((e) =>{
  console.error('❌ Error connecting to SQL Server:', e);
});

// Routes

app.use('/auth', signup);
app.use('/lookup', getBranches);
app.use('/publication', addPublication); 

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});