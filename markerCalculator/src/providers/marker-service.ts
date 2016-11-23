import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MarkerService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MarkerService {
  mydata :any

  constructor(public http: Http) {
    console.log('Hello MarkerService Provider');
  }

  load() {
    if (this.mydata) {
      // already loaded data
      return Promise.resolve(this.mydata);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      var url = 'basicDatabase.json';
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.mydata = data;
          resolve(this.mydata);
        });
    });
  }

}
