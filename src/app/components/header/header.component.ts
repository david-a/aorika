import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  defaultHeight = 70;
  scrolledHeight = 50;
  height!: string;
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
    } else {
      this.height = `${this.defaultHeight}px`;
    }
  };
}
