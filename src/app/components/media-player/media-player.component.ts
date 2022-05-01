import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  MediaPlayerItem,
  MediaPlayerService,
} from 'src/app/services/media-player.service';

import { isPhoto } from 'src/app/utils/stringUtils';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaPlayerComponent implements OnInit {
  subscriptions: { [key: string]: Subscription } = {};
  item?: MediaPlayerItem;
  selected?: string;
  seed?: number;
  isPhoto = isPhoto;
  dbServices: any;
  overlay?: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private mediaPlayerService: MediaPlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.mediaPlayerService =
      this.mediaPlayerService.mediaPlayerItem$.subscribe((event) => {
        this.item = event?.item;
        this.overlay = event?.overlay;
        this.seed = Math.random();
        this.selected = this.item?.coverImageUrl;
        this.item &&
          (document.getElementById('main-background-video') as any)?.pause();
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    Object.keys(this.subscriptions).forEach((key) =>
      this.subscriptions[key]?.unsubscribe()
    );
  }

  onClose() {
    (document.getElementById('main-background-video') as any)?.play();
    this.mediaPlayerService.emitMediaPlayerItem(null);
  }

  onClick(url: string, event: any) {
    event.stopPropagation();
    if (this.selected !== url) {
      this.selected = url;
      const allVideos = document.querySelectorAll('.media-player video') as any;
      window.scrollTo(0, 0);
      setTimeout(() => {
        allVideos?.forEach((vid: any) => {
          const selected = vid?.querySelector('*')?.closest('.selected');
          selected ? vid.play() : vid.pause();
        });
      });
    }
  }

  shouldBeTall(url: string, index: number) {
    if (
      url === this.selected ||
      !this.item ||
      this.item?.media.length - 4 < index
    )
      return false;
    return this.seed! < 0.2;
  }

  shouldBeWide(url: string, index: number) {
    if (url === this.selected || index <= 4) return false;
    return this.seed! > 0.8;
  }

  isSelected(url: string) {
    return url === this.selected;
  }
}