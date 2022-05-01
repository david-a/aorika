import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { Workshop } from 'src/app/models/Workshop.model';

export type MediaPlayerItem = Product | Workshop | null;

export type MediaPlayerEvent = {
  item: MediaPlayerItem;
  overlay?: boolean;
} | null;

@Injectable({
  providedIn: 'root',
})
export class MediaPlayerService {
  private readonly mediaPlayerItemSource =
    new BehaviorSubject<MediaPlayerEvent>(null);

  readonly mediaPlayerItem$ = this.mediaPlayerItemSource.asObservable();

  emitMediaPlayerItem(msg: MediaPlayerEvent) {
    this.mediaPlayerItemSource.next(msg);
  }
  constructor() {}
}
