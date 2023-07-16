import puppeteer, { Browser } from 'puppeteer';
import { ArticleProps } from '../types';
import { Articles } from './models/article.model';

const BASE_URL: string = 'https://dev.to';
const BATCH_SIZE: number = 10;
const ARTICLES_LIST: ArticleProps[] = [];

const scrapeArticles = async (url: string) => {
  try {
    const browser: Browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
    });

    const selector = '.crayons-story';
    await page.waitForSelector(selector);
    const articles = await page.$$(selector);

    for (let article of articles) {
      const titleElement = await article.$('.crayons-story__title > a');
      const authorElement = await article.$('.profile-preview-card__trigger');
      const dateElement = await article.$('.crayons-story__tertiary > time');
      const readElement = await article.$('.crayons-story__save > small');

      const title = titleElement
        ? await titleElement.evaluate((el) => el.innerText.trim())
        : '';

      const link = titleElement
        ? await titleElement.evaluate((el) => el.getAttribute('href'))
        : '';

      const prefixedLink = link && `${BASE_URL}${link}`;

      const author = authorElement
        ? await authorElement.evaluate((el) => el.textContent.trim())
        : '';

      const date = dateElement
        ? await dateElement.evaluate((el) => el.textContent.trim())
        : '';

      const readTime = readElement
        ? await readElement.evaluate((el) => el.textContent.trim())
        : '';

      ARTICLES_LIST.push({
        title,
        author,
        url: prefixedLink,
        publishedDate: date,
        readTime,
      });
    }

    console.log('articlesList', ARTICLES_LIST);

    const saveInBatch = async () => {
      try {
        for (let i = 0; i < ARTICLES_LIST.length; i++) {
          const batch = ARTICLES_LIST.slice(i, i + BATCH_SIZE);

          const saveArticles = new Articles(batch);

          await saveArticles.save();
        }
        console.log('Saved Successfully');
      } catch (err) {
        console.log(err);
      }
    };

    if (ARTICLES_LIST.length > 0) {
      saveInBatch();
    }

    await browser.close();
  } catch (err) {
    console.error(err);
  }
};

scrapeArticles(BASE_URL);
