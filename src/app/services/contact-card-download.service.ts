import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  CONTACT_VCF_DOWNLOAD_FILENAME,
  CONTACT_VCF_HREF,
  POST_VCF_CONTACT_ACTIVATED_EVENT,
  POST_VCF_CONTACT_SESSION_KEY,
} from '../utils/constants';

@Injectable({ providedIn: 'root' })
export class ContactCardDownloadService {
  readonly vcfHref = CONTACT_VCF_HREF;
  readonly vcfDownloadFilename = CONTACT_VCF_DOWNLOAD_FILENAME;

  constructor(private router: Router) {}

  /** לינק `<a download>` — השאר את ההורדה לדפדפן */
  onVcfAnchorClick(): void {
    this.persistPostVcfIntentAndNotify();
    this.scheduleScrollToContactSection();
  }

  /** `<button>` — הורדה פרוגרמטית + אותה זרימה */
  triggerDownloadFromButton(): void {
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
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    if (path === '/') {
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }
    void this.router.navigate(['/'], { fragment: 'contact' });
  }
}
