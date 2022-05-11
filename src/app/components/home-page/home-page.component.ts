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
