import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const MAIN_URL = 'https://casino.verajohn.com';
const ALL_GAMES_URL = `${MAIN_URL}/en/all-games`;

const data = [];

async function getAllCategotiesNames(page) {
  const categories = await page.$$eval('.gff-game-list__header__title', (els) =>
    els.map((category) => category.innerHTML.trim())
  );

  categories.forEach((name) => {
    data.push({ slug: '', categoryName: name, games: [] });
  });
}

async function getAllCategotiesSlugs(page) {
  const slugs = await page.$$eval('.gff-game-list__header > a', (els) =>
    els.map((slug) => slug.getAttribute('href'))
  );

  slugs.forEach((slug, index) => {
    data[index].slug = slug;
  });
}

async function getGamesName(page, indexEl) {
  const displayNames = await page.$$eval('.gff-game-grid > game-tile', (els) =>
    els.map((displayName) => displayName.getAttribute('display-name'))
  );

  displayNames.forEach((name) => {
    data[indexEl].games.push({ title: name, iconUrl: '' });
  });
}

async function getGamesUrl(page, indexEl) {
  const iconUrls = await page.$$eval('.gff-game-grid > game-tile', (els) =>
    els.map((url) => url.getAttribute('icon-url'))
  );

  iconUrls.forEach((iconUrl, index) => {
    data[indexEl].games[index].iconUrl = iconUrl;
  });
}

async function getAllCategotyGames(el, index) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${MAIN_URL}${el.slug}`);

  await page.waitForSelector('.gff-game-grid__container');

  await getGamesName(page, index);
  await getGamesUrl(page, index);

  await browser.close();
}

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(ALL_GAMES_URL);

  await page.waitForSelector('.game-block-wrapper');

  await getAllCategotiesNames(page);
  await getAllCategotiesSlugs(page);

  for (let i = 0; i < data.length; i++) {
    await getAllCategotyGames(data[i], i);
  }

  createJSONFile(data);

  await browser.close();
}

run();

const createJSONFile = (data) => {
  fs.writeFile('./data.json', JSON.stringify(data), (err) => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      console.log('Successfully wrote file');
    }
  });
};
