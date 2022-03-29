import { Component, Input, OnInit } from '@angular/core';
import { Workshop } from 'src/app/models/Workshop.model';

@Component({
  selector: 'app-workshop-card',
  templateUrl: './workshop-card.component.html',
  styleUrls: ['./workshop-card.component.scss'],
})
export class WorkshopCardComponent implements OnInit {
  @Input() workshop!: Workshop;
  constructor() {}

  ngOnInit(): void {}
}
