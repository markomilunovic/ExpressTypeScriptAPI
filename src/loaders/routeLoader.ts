import express from 'express';
import todoRoute from '../routes/todoRoute';
import userRoute from '../routes/userRoute';
import authRoute from '../routes/authRoute';

function routeLoader(app: express.Application): void {
    app.use('/todos', todoRoute);
    app.use('/users', userRoute);
    app.use('/auth', authRoute);
}

export default routeLoader;
