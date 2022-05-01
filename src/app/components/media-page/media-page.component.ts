import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Indexable } from 'src/app/interfaces/Indexable';
import { MediaPlayerService } from 'src/app/services/media-player.service';
import { ProductService } from 'src/app/services/product.service';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.scss'],
})
export class MediaPageComponent implements OnInit {
  subscriptions: { [key: string]: Subscription } = {};
  dbServices: any;

  constructor(
    private route: ActivatedRoute,
    private mediaPlayerService: MediaPlayerService,
    private productService: ProductService,
    private workshopService: WorkshopService
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
  }

  get urlItemKeyType() {
    return window.location.pathname.includes('/product/')
      ? 'product'
      : 'workshop';
  }

  onParamsChange = ({ params }: { params: Indexable }) => {
    const keyFromUrl = params.id;

    if (keyFromUrl) {
      const item =
        this.urlItemKeyType &&
        this.dbServices[this.urlItemKeyType].getItemByKey(keyFromUrl);
      item && this.mediaPlayerService.emitMediaPlayerItem({ item });
    }
  };
}
