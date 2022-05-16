import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor() {}

  ngOnInit() {
    this.scrollEvent();
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
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
