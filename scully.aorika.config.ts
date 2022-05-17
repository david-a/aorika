import { ScullyConfig } from '@scullyio/scully';
import '@scullyio/scully-plugin-puppeteer';
const PRODUCTS = require('./src/app/utils/db/products.json');
const WORKSHOPS = require('./src/app/utils/db/workshops.json');

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'aorika',
  outDir: './dist/scully',
  routes: {},
  extraRoutes: [
    ...Object.keys(PRODUCTS).map((productKey) => `/product/${productKey}`),
    ...Object.keys(WORKSHOPS).map((workshopKey) => `/workshop/${workshopKey}`),
  ],
};
