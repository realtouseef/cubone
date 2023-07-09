import puppeteer, { Browser } from 'puppeteer';
import type { ArticleProps } from './types';

const BASE_URL = 'https://dev.to/';

const scrapeArticles = async (url: string) => {
  const browser: Browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  });

  const articles = await page.evaluate(() => {
    const articleList = document.querySelectorAll('#substories');

    return Array.from(articleList).map((article): ArticleProps => {
      const title = article.querySelector(
        '.crayons-story__hidden-navigation-link'
      ).textContent;

      const url = article
        .querySelector('.crayons-story__title a')
        .getAttribute('href');

      const author = article
        .querySelector('.profile-preview-card > button')
        .textContent.trim();

      const publishedDate = article
        .querySelector('.crayons-story__tertiary > time')
        .getAttribute('title');

      return { title, url, author, publishedDate };
    });
  });

  console.log('articles', articles);

  await browser.close();
};

scrapeArticles(BASE_URL);
