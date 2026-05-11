import { Component, OnInit } from '@angular/core';
import { ContactCardDownloadService } from 'src/app/services/contact-card-download.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public contactCardDownload: ContactCardDownloadService) { }

  ngOnInit(): void {
  }

}
