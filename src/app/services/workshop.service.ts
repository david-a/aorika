import { Injectable } from '@angular/core';
import { Workshop } from '../models/Workshop.model';
import { WORKSHOPS } from '../utils/db/workshops';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService extends BaseService<Workshop> {
  constructor() {
    super(WORKSHOPS, (obj: any) => new Workshop(obj));
  }

  getWorkshopsByKeys = this.getItemsByKeys;

  getWorkshopByKey = this.getItemByKey;

  getWorkshops = this.getItems;
}
