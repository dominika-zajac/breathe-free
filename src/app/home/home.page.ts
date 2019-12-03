import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  constructor(private http: HttpClient) {
    this.reload();
  }

  reload() {
    this.http
      .get(
        'https://api.waqi.info/feed/cracow/?token=62bdd9760e412e62ec5dd05d1d471b7a07c0e363'
      )
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

}
