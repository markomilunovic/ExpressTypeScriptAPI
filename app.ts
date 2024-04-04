import express from 'express';
import middlewareLoader from './src/loaders/middlewareLoader';
import routeLoader from './src/loaders/routeLoader';
import dbLoader from './src/loaders/dbLoader';

const app = express();
const PORT = 3000;

// Load middleware
middlewareLoader(app);

// Load routes
routeLoader(app);

// Start the server and connect to the database
app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}...`);
    await dbLoader();
});
