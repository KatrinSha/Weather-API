import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-app';
  city = [];
  
    temperatureCelsius: any;
    atmosphericPressurehPa: any;
    humidity: any;
    windSpeed: any;
    windDirection: any;
    weatherIcon: any;
    forCity: any;

  Data = new Date();
  Day = this.Data.getDate();
  Month = this.Data.getMonth();
  time = `${this.Day}.${this.Month + 1}`


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`http://api.airvisual.com/v2/nearest_city?lat=53.907364&lon=27.572680&key=5e72b8e3-974b-4a07-a251-7fd73bbd3e90`)
      .subscribe((response: any) => {
        this.temperatureCelsius = response.data.current.weather.tp;
        this.atmosphericPressurehPa = response.data.current.weather.pr;
        this.humidity = response.data.current.weather.hu;
        this.windSpeed = response.data.current.weather.ws;
        this.windDirection = response.data.current.weather.wd;
        this.forCity = response.data.city;
      });
  }

  onClick() {
    this.http.get('https://api.airvisual.com/v2/cities?state=California&country=USA&key=5e72b8e3-974b-4a07-a251-7fd73bbd3e90').pipe(map((response: any) => response.data)).subscribe((list: any) => {
      this.city = list.map((el: any) => el.city);
    });
  }


  weatherFor(event: any) {
    this.forCity = event.target.textContent;
    console.log(this.forCity);
    this.http.get(`https://api.airvisual.com/v2/city?city=${this.forCity}&state=California&country=USA&key=5e72b8e3-974b-4a07-a251-7fd73bbd3e90`)
      .subscribe((response: any) => {
        console.log(response);
        this.temperatureCelsius = response.data.current.weather.tp;
        this.atmosphericPressurehPa = response.data.current.weather.pr;
        this.humidity = response.data.current.weather.hu;
        this.windSpeed = response.data.current.weather.ws;
        this.windDirection = response.data.current.weather.wd;
      });
  }
}
