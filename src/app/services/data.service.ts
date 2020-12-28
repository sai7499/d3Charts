import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient
  ) { }

  //  function to get data from api
  responseUrl = "https://api.jsonbin.io/b/5eee6a5397cb753b4d149343";
  jsonUrl = 'assets/data.json';

  dataFromApi() {

    return this.http.get(this.responseUrl);
  }
  dataForScatterChart() {
    return this.http.get(this.jsonUrl);
  }
  dataForSharedBarChart() {
    return this.http.get(this.jsonUrl);
  }
}
