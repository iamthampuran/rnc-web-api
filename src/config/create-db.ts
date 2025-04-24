import { Sequelize } from 'sequelize';
import 'dotenv/config';

(async () => {
  const {
    DB_HOST,        // e.g. "localhost"
    DB_INSTANCE,    // new: e.g. "SQLEXPRESS"
    DB_USER,
    DB_PASSWORD,
    DB_NAME
  } = process.env;

  const sequelize = new Sequelize('master', DB_USER!, DB_PASSWORD!, {
    host: DB_HOST,            // e.g. "localhost"
    // **no** port if you’re using instanceName
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
      instanceName: DB_INSTANCE,       // e.g. "SQLEXPRESS"
      options: {
        encrypt: false,                // for local dev
        trustServerCertificate: true   // trust self‐signed
      }
    }
  });

  try {
    await sequelize.authenticate();
    console.log('✔ Connected to master');
    
    await sequelize.query(`
      IF DB_ID(N'${DB_NAME}') IS NULL
        CREATE DATABASE [${DB_NAME}];
    `);
    console.log(`✔ Database "${DB_NAME}" ensured.`);
  } catch (err) {
    console.error('✖ Connection failed:', err);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
})();
