import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Indexable } from 'src/app/interfaces/Indexable';
import { assetUrl } from 'src/app/pipes/Asset.pipe';
import {
  MediaPlayerItem,
  MediaPlayerService,
} from 'src/app/services/media-player.service';
import { ProductService } from 'src/app/services/product.service';
import { WorkshopService } from 'src/app/services/workshop.service';
import { DEFAULT_META_DATA } from 'src/app/utils/constants';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.scss'],
})
export class MediaPageComponent implements OnInit {
  item?: MediaPlayerItem;
  subscriptions: { [key: string]: Subscription } = {};
  dbServices: any;

  constructor(
    private route: ActivatedRoute,
    private mediaPlayerService: MediaPlayerService,
    private productService: ProductService,
    private workshopService: WorkshopService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.dbServices = {
      product: productService,
      workshop: workshopService,
    };
  }

  ngOnInit() {
    this.subscriptions.querySubscription = (
      this.route.paramMap as any
    ).subscribe(this.onParamsChange);
  }

  ngOnDestroy(): void {
    this.mediaPlayerService.emitMediaPlayerItem(null);
    Object.keys(this.subscriptions).forEach((key) =>
      this.subscriptions[key]?.unsubscribe()
    );
    this.metaService.updateTag({
      property: 'og:image',
      content: assetUrl(DEFAULT_META_DATA.og_image_filename),
    });
  }

  get urlItemKeyType() {
    return window.location.pathname.includes('/product/')
      ? 'product'
      : 'workshop';
  }

  onParamsChange = ({ params }: { params: Indexable }) => {
    const keyFromUrl = params.id;

    if (keyFromUrl) {
      this.item =
        this.urlItemKeyType &&
        this.dbServices[this.urlItemKeyType].getItemByKey(keyFromUrl);
      if (this.item) {
        this.mediaPlayerService.emitMediaPlayerItem({ item: this.item });

        this.titleService.setTitle(
          (this.item.name ? this.item.name + ' - ' : '') +
            (this.item.description
              ? this.item.description.trim().replace(/\.$/, '') + ' - '
              : '') +
            'סדנת אֵאוֹרִיקָה'
        );
        this.metaService.updateTag({
          property: 'og:url',
          content: this.item.shareUrl,
        });
        this.metaService.updateTag({
          property: 'og:image',
          content: this.item?.coverImageUrl,
        });
      }
    }
  };
}
