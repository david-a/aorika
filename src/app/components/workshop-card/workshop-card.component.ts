import { Component, Input, OnInit } from '@angular/core';
import { Workshop } from 'src/app/models/Workshop.model';
import { MediaPlayerService } from 'src/app/services/media-player.service';

@Component({
  selector: 'app-workshop-card',
  templateUrl: './workshop-card.component.html',
  styleUrls: ['./workshop-card.component.scss'],
})
export class WorkshopCardComponent implements OnInit {
  @Input() workshop!: Workshop;
  constructor(private mediaPlayerService: MediaPlayerService) {}

  ngOnInit(): void {}

  onClick(event: any) {
    event.preventDefault();
    this.mediaPlayerService.emitMediaPlayerItem({
      item: this.workshop,
      overlay: true,
    });
  }
}
