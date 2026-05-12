import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ContactCardDownloadService } from 'src/app/services/contact-card-download.service';
import { POST_VCF_CONTACT_MINI_WORKSHOP_MESSAGE } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mini-workshop-landing',
  templateUrl: './mini-workshop-landing.component.html',
  styleUrls: ['./mini-workshop-landing.component.scss'],
})
export class MiniWorkshopLandingComponent implements OnInit {
  readonly postVcfContactPrefillMessage = POST_VCF_CONTACT_MINI_WORKSHOP_MESSAGE;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    public contactCardDownload: ContactCardDownloadService
  ) {}

  ngOnInit(): void {
    const title = 'אאוריקה — סדנה בקטנה — מגנט עץ';
    this.titleService.setTitle(title);
    this.metaService.updateTag({
      property: 'og:url',
      content: `${environment.baseUrl.replace(/\/$/, '')}/mini-workshop`,
    });
  }
}
