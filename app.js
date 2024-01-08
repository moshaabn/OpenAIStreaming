import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import openaiRoutes from './routes/openaiRoutes.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/openai', openaiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});