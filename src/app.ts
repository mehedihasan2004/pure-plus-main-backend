import cors from 'cors';
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';

const app: Application = express();

/*================ MIDDLEWARES ================*/
app.use(cors());

/*================ PARSERS ================*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*================ ROUTES ================*/
app.use('/api/v1', Router());

/*================ TEST ROUTE ================*/
app.get('/test', (_, res) => {
  res.json('Pure Plus Main Backend Server On Fire 🔥 💧 🔥');
});

/*================ HANDLE NOT FOUND ================*/
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'not found!',
    errorMessages: [{ path: req.originalUrl, message: 'api not found!' }],
  });

  next();
});

export default app;
