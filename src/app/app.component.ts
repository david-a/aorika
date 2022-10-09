import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title, Meta } from '@angular/platform-browser';
import { assetUrl } from './pipes/Asset.pipe';
import { DEFAULT_META_DATA } from './utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  env = environment.production ? 'production' : 'development';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle(DEFAULT_META_DATA.title);
    this.metaService.addTags([
      { property: 'og:url', content: environment.baseUrl },
      {
        name: 'keywords',
        content: DEFAULT_META_DATA.keywords,
      },
      {
        property: 'og:image',
        content: assetUrl(DEFAULT_META_DATA.og_image_filename),
      },
      {
        name: 'og:description',
        content: DEFAULT_META_DATA.og_description,
      },
      {
        name: 'description',
        content: DEFAULT_META_DATA.description,
      },
      { name: 'robots', content: DEFAULT_META_DATA.robots },
    ]);
    document.onkeydown = this.onKeyDown;
  }

  onKeyDown(event: any) {
    if (event.keyCode == 72 && event.altKey)
      document.getElementById('aorika-logo-anchor')?.focus();
  }
}
