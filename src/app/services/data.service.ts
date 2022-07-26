import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(String) private url: string, private http: HttpClient) { }

  getData() {
    return this.http.get(this.url);
  }

  getSpecificData(urlValue: string) {
    return this.http.get(this.url+'/'+urlValue);
  }

  postData(data: any) {
    return this.http.post(this.url, data);
  }
}
