import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  POST_VCF_CONTACT_ACTIVATED_EVENT,
  POST_VCF_CONTACT_SESSION_KEY,
} from 'src/app/utils/constants';
import { isMobile } from 'src/app/utils/domUtils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  defaultHeight = 70;
  scrolledHeight = 50;
  height!: string;
  logoHeight!: string;
  isMobile = isMobile;
  constructor(private router: Router) {}

  ngOnInit() {
    this.scrollEvent();
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  isSelected(page: string) {
    return (
      page === window.location.pathname.trim().toLowerCase().replace('/', '')
    );
  }

  onContactCardDownloadClick(): void {
    try {
      sessionStorage.setItem(POST_VCF_CONTACT_SESSION_KEY, '1');
    } catch {
      /* ignore private mode / quota */
    }
    window.dispatchEvent(new CustomEvent(POST_VCF_CONTACT_ACTIVATED_EVENT));
    window.setTimeout(() => this.scrollHomeToContactSection(), 120);
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

  scrollEvent = (): void => {
    if (
      document.body.scrollTop > this.defaultHeight ||
      document.documentElement.scrollTop > this.defaultHeight
    ) {
      this.height = `${this.scrolledHeight}px`;
      this.logoHeight = `${this.scrolledHeight - 10}px`;
    } else {
      this.height = `${this.defaultHeight}px`;
      this.logoHeight = `${this.defaultHeight - 10}px`;
    }
  };
}
