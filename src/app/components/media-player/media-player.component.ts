import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  MediaPlayerItem,
  MediaPlayerService,
} from 'src/app/services/media-player.service';
import {
  elementInViewport,
  isMobile,
  navigateNonSmooth,
  navigateToContactFormAndMessage,
} from 'src/app/utils/domUtils';

import {
  copyMessage,
  filenameFromUrl,
  isPhoto,
} from 'src/app/utils/stringUtils';
import { environment } from 'src/environments/environment';

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
  showClipboardCopied = false;

  @ViewChild('infoItem') infoItemRef?: ElementRef;

  constructor(
    private cdr: ChangeDetectorRef,
    private mediaPlayerService: MediaPlayerService,
    private router: Router,
    protected _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.subscriptions.mediaPlayerService =
      this.mediaPlayerService.mediaPlayerItem$.subscribe((event) => {
        this.item = event?.item;
        this.showClipboardCopied = false;
        this.overlay = event?.overlay;
        this.seed = Math.random();
        const coverImageIndexInMedia =
          !!this.item?.coverImage &&
          this.item?.media.indexOf(this.item.coverImage);
        this.selected =
          this.item?.allMediaUrls[
            (coverImageIndexInMedia >= 0 && coverImageIndexInMedia) || 0
          ];

        if (this.item) {
          (document.getElementById('main-background-video') as any)?.pause();
          setTimeout(() => {
            this.focusOnAccesibilityAnchor();
          }, 100);
        }

        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    Object.keys(this.subscriptions).forEach((key) =>
      this.subscriptions[key]?.unsubscribe()
    );
  }

  @HostListener('document:keyup.escape', ['$event'])
  escHandler(event: KeyboardEvent) {
    this.overlay && this.onClose(true);
  }

  focusOnAccesibilityAnchor() {
    this.infoItemRef?.nativeElement
      .querySelector('.accessibility-anchor')
      .focus();
  }

  onClose(keyboard = false) {
    if (!isMobile()) {
      (document.getElementById('main-background-video') as any)?.play();
    }
    this.mediaPlayerService.emitMediaPlayerItem(null);
    if (keyboard) {
      document.getElementById('aorika-logo-anchor')?.focus();
    }
  }

  onClick(url: string, event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.selected !== url) {
      this.selected = url;
      if (
        !isMobile() &&
        this.infoItemRef &&
        !elementInViewport(this.infoItemRef)
      ) {
        this.infoItemRef?.nativeElement.scrollIntoView();
      }
      const allVideos = document.querySelectorAll('.media-player video') as any;
      setTimeout(() => {
        allVideos?.forEach((vid: any) => {
          const selected = vid?.querySelector('*')?.closest('.selected');
          selected ? vid.play() : vid.pause();
        });
      });
    }
  }

  isExternalVideo(url: string) {
    return url.includes('youtube.com');
  }

  bypassSecurityTrustResourceUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getExternalVideoThumb(url: string) {
    const videoId = url.match(/\/embed\/(.*)\/?/);
    return (
      videoId &&
      videoId[1] &&
      `https://img.youtube.com/vi/${videoId[1]}/mqdefault.jpg`
    );
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
    return filenameFromUrl(url) === filenameFromUrl(this.selected);
  }

  get shareUrl() {
    return this.item?.shareUrl;
  }

  get shareText() {
    return this.item?.type === 'product'
      ? 'מצאתי מוצר מדליק באאוריקה'
      : 'הנה כמה תמונות מדליקות מהסדנה באאוריקה';
  }

  copyUrl(event: any) {
    event.preventDefault();
    if (this.shareUrl && copyMessage(this.shareUrl)) {
      this.showClipboardCopied = true;
      this.focusOnAccesibilityAnchor();
      setTimeout(() => {
        this.showClipboardCopied = false;
        this.cdr.markForCheck();
      }, 5000);
    }
  }

  orderNow() {
    const name = this.item?.name || 'אאוריקה';
    this.onClose();
    navigateNonSmooth(this.router, '/');
    setTimeout(() => {
      navigateToContactFormAndMessage(
        `היי אור! \nאשמח לשמוע פרטים נוספים על סדנת ` + name + '.'
      );
    }, 100);
  }
}
