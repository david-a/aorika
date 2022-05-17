import { Injectable } from '@angular/core';
import { Indexable } from '../interfaces/Indexable';
import { Workshop } from '../models/Workshop.model';
import WORKSHOPS from '../utils/db/workshops.json';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService extends BaseService<Workshop> {
  constructor() {
    super(WORKSHOPS as Indexable, (obj: any) => new Workshop(obj));
  }

  getWorkshopsByKeys = this.getItemsByKeys;

  getWorkshopByKey = this.getItemByKey;

  getWorkshops = this.getItems;

  getRandomWorkshops = this.getRandomItems;
}
