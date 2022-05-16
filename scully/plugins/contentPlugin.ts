import { registerPlugin, routeSplit } from '@scullyio/scully';
import { ProductService } from '../../src/app/services/product.service';
import { PRODUCTS } from '../../src/app/utils/db/products';
const ContentPlugin = 'content';

const contentPlugin = (route, config) => {
  const ps = new ProductService();

  console.log('DEDDY', ps.getProducts(), PRODUCTS);
  return Promise.resolve([]);
};

const contentPluginValidator = (conf) => [];

registerPlugin('router', 'content', contentPlugin, contentPluginValidator);
exports.ContentPlugin = ContentPlugin;
