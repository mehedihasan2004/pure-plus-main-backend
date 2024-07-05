import cors from 'cors';
import express from 'express';

const app = express();

/*================ MIDDLEWARES ================*/
app.use(cors());

/*================ PARSER ================*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (_, res) => {
  res.json('Pure Plus Main Backend Server On Fire 🔥 💧 🔥');
});

app.listen(5000, () => console.log(`Server running on http://localhost:5000`));
