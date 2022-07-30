import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService extends DataService {

  constructor(http: HttpClient) {
    super('https://josephosan.info/api/metro-finder/coordinates', http);
  }
}
