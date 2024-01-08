import express from 'express';
import { getCompletion } from '../controllers/openaiController.js';

const router = express.Router();

router.post('/', getCompletion);

export default router;