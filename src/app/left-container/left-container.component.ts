import { Component, NgModule } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-left-container',
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './left-container.component.html',
  styleUrl: './left-container.component.css'
})
export class LeftContainerComponent {
  //Variables for font awesome icons
  faMagnifyingGlass: any = faMagnifyingGlass;
  faLocation: any = faLocation;

  //Varaiables for temparature summary
  faCloud: any = faCloud
  faCloudRain: any = faCloudRain;
  currenttime = new Date;

  location: string = ''
  constructor(public weatherService: WeatherService) {

  }


  onClickSearch(location: string) {
    console.log(location);
    this.weatherService.cityName = location;
    this.weatherService.getData();
    this.location = '';
  }
}
