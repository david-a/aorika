import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CONTACT_FAILURE_MESSAGE,
  CONTACT_SUCCESS_MESSAGE,
  POST_VCF_CONTACT_ACTIVATED_EVENT,
  POST_VCF_CONTACT_DEFAULT_MESSAGE,
  POST_VCF_CONTACT_SESSION_KEY,
} from 'src/app/utils/constants';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss'],
})
export class ContactSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  /** אם מוגדר (למשל בדף הנחיתה של הסדנה), מחליף את הטקסט שממלאים אחרי הורדת כרטיס הביקור */
  @Input() postVcfContactPrefillMessage?: string;

  submitMessage?: string;
  submitError?: string;
  postVcfContactUi = false;

  @ViewChild('contactMessage')
  private contactMessageEl?: ElementRef<HTMLTextAreaElement>;

  private readonly postVcfActivatedListener = (): void => {
    this.ngZone.run(() => {
      this.postVcfContactUi = true;
      window.setTimeout(() => this.prefillPostVcfContactMessage(), 0);
    });
  };

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
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
    el.value =
      this.postVcfContactPrefillMessage ?? POST_VCF_CONTACT_DEFAULT_MESSAGE;
  }

  onSubmitContactForm(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

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
          response.json().then((body) => {
            if (body.hasOwnProperty('errors')) {
              console.error(
                body['errors'].map((error: { message: string }) => error.message).join(', ')
              );
            }

            this.submitError = CONTACT_FAILURE_MESSAGE;
          });
        }
      })
      .catch(() => {
        this.submitError = CONTACT_FAILURE_MESSAGE;
      });
  }
}
