import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Connect to "master" so we can CREATE DATABASE
const sequelize = new Sequelize('master', process.env.DB_USER!, process.env.DB_PASSWORD!, {
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


async function createDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to SQL Server');
    await sequelize.query(`CREATE DATABASE [${process.env.DB_NAME}]`);
    console.log(`✅ Database "${process.env.DB_NAME}" created`);
  } catch (e) {
    console.error('❌ Error creating database:', e);
  } finally {
    await sequelize.close();
  }
}

createDatabase();
