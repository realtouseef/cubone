import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'There should be a title for an Article'],
    trim: true,
  },
  url: {
    type: String,
    require: [true, 'There must be a URL for an Article'],
  },
  author: {
    type: String,
    require: [true, 'Author name is Required.'],
  },
  publishedDate: {
    type: String,
    require: [true, 'Published Date is Required.'],
  },
  readTime: {
    type: String,
    require: false,
  },
});

export const Articles = mongoose.model('Articles', ArticleSchema);
