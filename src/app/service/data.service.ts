import { Injectable } from '@angular/core';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  public dataArray: any[] = [];
}
