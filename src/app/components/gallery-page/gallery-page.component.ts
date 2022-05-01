import { Component, OnInit } from '@angular/core';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
})
export class GalleryPageComponent implements OnInit {
  constructor(private workshopService: WorkshopService) {}

  ngOnInit(): void {}

  get workshops() {
    return this.workshopService.getWorkshops();
  }
}
