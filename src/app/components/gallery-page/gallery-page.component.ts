import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { WorkshopService } from 'src/app/services/workshop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
})
export class GalleryPageComponent implements OnInit {
  title = 'אאוריקה - גלריית סדנאות';
  constructor(
    private workshopService: WorkshopService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({
      property: 'og:url',
      content: environment.baseUrl + 'gallery',
    });
  }

  get workshops() {
    return this.workshopService.getWorkshops(undefined, ['gallery']);
  }
}
