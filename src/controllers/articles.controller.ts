import { Request, Response } from 'express';

import { Articles } from '../models/article.model';

const getAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Articles.find();
    res.status(200).json({ articles });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export { getAllArticles };
