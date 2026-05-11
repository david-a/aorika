import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/Product.model';
import { Workshop } from 'src/app/models/Workshop.model';
import { ContactCardDownloadService } from 'src/app/services/contact-card-download.service';
import { ProductService } from 'src/app/services/product.service';
import { WorkshopService } from 'src/app/services/workshop.service';
import {
  CONTACT_FAILURE_MESSAGE,
  CONTACT_SUCCESS_MESSAGE,
  DEFAULT_META_DATA,
  POST_VCF_CONTACT_ACTIVATED_EVENT,
  POST_VCF_CONTACT_DEFAULT_MESSAGE,
  POST_VCF_CONTACT_SESSION_KEY,
} from 'src/app/utils/constants';
import { isMobile } from 'src/app/utils/domUtils';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  sampleProducts!: Product[];
  sampleWorkshops!: Workshop[];
  submitMessage?: string;
  submitError?: string;
  postVcfContactUi = false;
  isMobile = isMobile;

  @ViewChild('contactMessage')
  private contactMessageEl?: ElementRef<HTMLTextAreaElement>;

  private readonly postVcfActivatedListener = (): void => {
    this.ngZone.run(() => {
      this.postVcfContactUi = true;
      window.setTimeout(() => this.prefillPostVcfContactMessage(), 0);
    });
  };

  constructor(
    private productService: ProductService,
    private workshopService: WorkshopService,
    private titleService: Title,
    private metaService: Meta,
    private ngZone: NgZone,
    public contactCardDownload: ContactCardDownloadService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(DEFAULT_META_DATA.title);
    this.metaService.updateTag({
      property: 'og:url',
      content: environment.baseUrl,
    });
    this.sampleProducts = this.productService.getRandomProducts(3, [
      'catalog',
      'homepage',
    ]);
    this.sampleWorkshops = this.workshopService.getRandomWorkshops(3, [
      'gallery',
      'homepage',
    ]);
    try {
      this.postVcfContactUi =
        sessionStorage.getItem(POST_VCF_CONTACT_SESSION_KEY) === '1';
    } catch {
      this.postVcfContactUi = false;
    }
    window.addEventListener(
      POST_VCF_CONTACT_ACTIVATED_EVENT,
      this.postVcfActivatedListener
    );
  }

  ngOnDestroy(): void {
    window.removeEventListener(
      POST_VCF_CONTACT_ACTIVATED_EVENT,
      this.postVcfActivatedListener
    );
  }

  ngAfterViewInit(): void {
    this.prefillPostVcfContactMessage();
  }

  private prefillPostVcfContactMessage(): void {
    if (!this.postVcfContactUi || this.submitMessage) {
      return;
    }
    const el = this.contactMessageEl?.nativeElement;
    if (!el || el.value.trim()) {
      return;
    }
    el.value = POST_VCF_CONTACT_DEFAULT_MESSAGE;
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
