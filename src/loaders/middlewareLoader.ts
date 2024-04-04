import { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

function middlewareLoader(app: Application): void {
    app.use(cookieParser());
    app.use(bodyParser.json());
}

export default middlewareLoader;
