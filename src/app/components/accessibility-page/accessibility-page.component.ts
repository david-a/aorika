import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-accessibility-page',
  templateUrl: './accessibility-page.component.html',
  styleUrls: ['./accessibility-page.component.scss'],
})
export class AccessibilityPageComponent implements OnInit {
  title = 'אאוריקה - הצהרת נגישות';
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({
      property: 'og:url',
      content: environment.baseUrl + 'accessibility',
    });
  }
}
