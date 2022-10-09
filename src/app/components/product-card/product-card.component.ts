import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { MediaPlayerService } from 'src/app/services/media-player.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  constructor(private mediaPlayerService: MediaPlayerService) {}

  ngOnInit(): void {}

  onClick(event: any) {
    event.preventDefault();
    this.mediaPlayerService.emitMediaPlayerItem({
      item: this.product,
      overlay: true,
    });
  }
}
