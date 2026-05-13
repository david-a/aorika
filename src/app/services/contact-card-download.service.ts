import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CONTACT_VCF_DOWNLOAD_FILENAME,
  CONTACT_VCF_HREF,
  POST_VCF_CONTACT_ACTIVATED_EVENT,
  POST_VCF_CONTACT_SESSION_KEY,
} from '../utils/constants';
import {
  AnalyticsService,
  ContactCardPlacement,
} from './analytics.service';

@Injectable({ providedIn: 'root' })
export class ContactCardDownloadService {
  readonly vcfHref = CONTACT_VCF_HREF;
  readonly vcfDownloadFilename = CONTACT_VCF_DOWNLOAD_FILENAME;

  constructor(
    private router: Router,
    private analytics: AnalyticsService
  ) {}

  /** לינק `<a download>` — השאר את ההורדה לדפדפן */
  onVcfAnchorClick(placement: ContactCardPlacement): void {
    this.analytics.contactCardSave(placement, 'anchor');
    this.persistPostVcfIntentAndNotify();
    this.scheduleScrollToContactSection();
  }

  /** `<button>` — הורדה פרוגרמטית + אותה זרימה */
  triggerDownloadFromButton(placement: ContactCardPlacement): void {
    this.analytics.contactCardSave(placement, 'button');
    this.persistPostVcfIntentAndNotify();
    this.scheduleScrollToContactSection();
    this.programmaticVcfDownload();
  }

  private persistPostVcfIntentAndNotify(): void {
    try {
      sessionStorage.setItem(POST_VCF_CONTACT_SESSION_KEY, '1');
    } catch {
      /* private mode / quota */
    }
    window.dispatchEvent(new CustomEvent(POST_VCF_CONTACT_ACTIVATED_EVENT));
  }

  private scheduleScrollToContactSection(delayMs = 120): void {
    window.setTimeout(() => this.scrollHomeToContactSection(), delayMs);
  }

  private programmaticVcfDownload(): void {
    const a = document.createElement('a');
    a.href = this.vcfHref;
    a.download = this.vcfDownloadFilename;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private scrollHomeToContactSection(): void {
    // דף הבית, דף נחיתה עם טופס, וכו׳ — כל עוד יש `#contact` ב-DOM
    if (document.getElementById('contact')) {
      this.scrollContactSectionIntoView();
      return;
    }
    // Keep `#contact` in the URL, but do not rely on Router anchor scroll alone:
    // it often runs before the home layout is stable (images, video). Correct
    // with the same deferred scrollIntoView as on `/`.
    void this.router.navigate(['/'], { fragment: 'contact' }).then((ok) => {
      if (!ok) {
        return;
      }
      this.scrollContactAfterHomeNavigation();
    });
  }

  private scrollContactSectionIntoView(): void {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  /** Run after route activation + next paint so `#contact` exists and layout has settled. */
  private scrollContactAfterHomeNavigation(): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(() => this.scrollContactSectionIntoView(), 180);
      });
    });
  }
}
