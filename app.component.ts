import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  city = [];
  weatherData = {
    temperatureCelsius: 0,
    atmosphericPressurehPa: 0,
    humidity: 0,
    windSpeed: 0,
    windDirection: 0,
    weatherIcon: 0,
    forCity: '',
  }
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get(`http://api.airvisual.com/v2/nearest_city?lat=53.907364&lon=27.572680&key=5e72b8e3-974b-4a07-a251-7fd73bbd3e90`)
      .subscribe((response: any) => {
        const { data: { current: { weather: { tp, pr, hu, ws, wd, ic } }, city } } = response;
        this.weatherData = {
          temperatureCelsius: tp,
          atmosphericPressurehPa: pr,
          humidity: hu,
          windSpeed: ws,
          windDirection: wd,
          weatherIcon: ic,
          forCity: city,
        }
      });
  }
  onClick() {
    this.http.get('https://api.airvisual.com/v2/cities?state=California&country=USA&key=5e72b8e3-974b-4a07-a251-7fd73bbd3e90').pipe(map((response: any) => response.data)).subscribe((list: any) => {
      this.city = list.map((el: any) => el.city);
    });
  }
  weatherFor(event: any) {
    this.weatherData.forCity = event.target.textContent;
    this.http.get(`https://api.airvisual.com/v2/city?city=${this.weatherData.forCity}&state=California&country=USA&key=5e72b8e3-974b-4a07-a251-7fd73bbd3e90`)
      .subscribe((response: any) => {
        console.log(this.weatherData.forCity)
        const { data: { current: { weather: { tp, pr, hu, ws, wd, ic } }, city } } = response;
        this.weatherData = {
          temperatureCelsius: tp,
          atmosphericPressurehPa: pr,
          humidity: hu,
          windSpeed: ws,
          windDirection: wd,
          weatherIcon: ic,
          forCity: city,
        }
      })
  }
}
