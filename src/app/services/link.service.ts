import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkService extends DataService {

  constructor(http: HttpClient) {
    super('http://176.97.218.208:3000/api/link-coordinates', http);
  }
}
