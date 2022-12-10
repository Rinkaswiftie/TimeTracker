import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import express, { Request } from 'express';
import { ApplicationError } from './errors/application-error';
import { router } from './routes';
import { logger } from './logger';

export const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.use('/api', router);

app.use((err: ApplicationError, _req: Request, res: any, next: any) => {
  logger.error(err.message);
  return res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' ? err : undefined,
    message: err.message
  });
});
