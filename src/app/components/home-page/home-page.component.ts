import { Component, OnInit } from '@angular/core';
import { Indexable } from 'src/app/interfaces/Indexable';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/Product.model';
import { Workshop } from 'src/app/models/Workshop.model';
import { ProductService } from 'src/app/services/product.service';
import { WorkshopService } from 'src/app/services/workshop.service';
import {
  CONTACT_FAILURE_MESSAGE,
  CONTACT_SUCCESS_MESSAGE,
} from 'src/app/utils/constants';
import { isMobile } from 'src/app/utils/domUtils';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  sampleProducts!: Product[];
  sampleWorkshops!: Workshop[];
  submitMessage?: string;
  submitError?: string;
  isMobile = isMobile;

  constructor(
    private productService: ProductService,
    private workshopService: WorkshopService
  ) {}

  ngOnInit(): void {
    this.sampleProducts = this.productService.getRandomProducts(3, [
      'catalog',
      'homepage',
    ]);
    this.sampleWorkshops = this.workshopService.getRandomWorkshops(3, [
      'gallery',
      'homepage',
    ]);
  }

  playVideoIfMobile() {
    const bgVideo = document.getElementById('main-background-video');
    if (bgVideo) {
      (bgVideo as any).style.display = 'block';
      if (isMobile()) (bgVideo as any).play();
    }
  }

  onPause() {
    const bgVideo = document.getElementById('main-background-video');
    if (bgVideo && isMobile()) {
      (bgVideo as any).style.display = 'none';
    }
  }

  async onSubmitContactForm(event: any) {
    event.preventDefault();
    var data = new FormData(event.target);
    fetch(environment.contactFormTarget, {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          this.submitMessage = CONTACT_SUCCESS_MESSAGE;
        } else {
          response.json().then((data) => {
            if (data.hasOwnProperty('errors')) {
              console.error(
                data['errors'].map((error: any) => error['message']).join(', ')
              );
            }

            this.submitError = CONTACT_FAILURE_MESSAGE;
          });
        }
      })
      .catch((error) => {
        this.submitError = CONTACT_FAILURE_MESSAGE;
      });
  }
}
