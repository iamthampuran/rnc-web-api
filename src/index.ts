import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
import signup from './routes/auth.routes'; // Adjust the path as necessary
import getBranches  from './routes/lookup.routes'; // Adjust the path as necessary

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

//connect to database
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,               // e.g. 'localhost'
  port: Number(process.env.DB_PORT),                  // now fixed
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  logging: false
});

  sequelize.authenticate().then(() => {
    console.log('✅ Connected to SQL Server');
  }).catch((e) =>{
  console.error('❌ Error connecting to SQL Server:', e);
});

// Routes

app.use('/signup', signup);
app.use('/lookup', getBranches)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});