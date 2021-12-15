
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {

  @Input() weatherDataCh = {
    temperatureCelsius: 0,
    atmosphericPressurehPa: 0,
    humidity: 0,
    windSpeed: 0,
    windDirection: 0,
    weatherIcon: 0,
    forCity: '',
  }
  myImage: string = 'assets/images/';
  Data = new Date();
  Day = this.Data.getDate();
  Month = this.Data.getMonth();
  time = `${this.Day}.${this.Month + 1}`
}
