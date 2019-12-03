import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  apiData: any;
  isLoading: boolean;
  level: string;

  UNHEALTHY_LVL = 50;
  DANGEROUS_LVL = 200;


  constructor(private http: HttpClient) {
    this.reload();
  }

  reload() {
    this.isLoading = true;
    this.apiData = { data: {} };// explain how response looks like
    this.http
      .get(
        'https://api.waqi.info/feed/cracow/?token=62bdd9760e412e62ec5dd05d1d471b7a07c0e363'
      )
      .subscribe(
        response => {
          console.log(response) // see how response looks like
          this.isLoading = false;
          this.apiData = response;
          this.level = this.aqiLevel();
        },
        error => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  private aqiLevel(): string {
    if (!this.apiData || !this.apiData.data) {
      return 'loading';
    }
    const aqi = this.apiData.data.aqi;
    if (aqi < this.UNHEALTHY_LVL) return 'good';
    if (aqi >= this.UNHEALTHY_LVL && aqi < this.DANGEROUS_LVL) return 'unhealthy';
    else return 'dangerous';
  }

}
