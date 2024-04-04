import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

// Retrieve environment variables
const {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST
} = process.env;

// Ensure all required environment variables are defined
if (!DB_NAME || !DB_USERNAME || !DB_PASSWORD || !DB_HOST) {
    throw new Error('Missing required environment variables');
}

// Create Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    dialect: 'mysql',
    host: DB_HOST
});

// Function to connect to the database
const connectToDb = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("MySQL Connected...");
    } catch (error) {
        console.log(error);
    }
};

// Export Sequelize instance and connectToDb function
export { sequelize, connectToDb };

