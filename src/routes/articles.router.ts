import express from 'express';
import { getAllArticles } from '../controllers/articles.controller';

export const router = express.Router();

router.route('/').get(getAllArticles);
