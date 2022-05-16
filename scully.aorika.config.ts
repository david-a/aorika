import { ScullyConfig } from '@scullyio/scully';
import '@scullyio/scully-plugin-puppeteer';
import './scully/plugins/contentPlugin';

/** this loads the default render plugin, remove when switching to something else. */

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'aorika',
  spsModulePath: 'YOUR OWN MODULE PATH HERE',
  outDir: './dist/static',
  routes: {
    '/:slug': {
      type: 'content',
    },
  },
};
