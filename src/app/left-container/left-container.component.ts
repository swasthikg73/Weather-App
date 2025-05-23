import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../services/weather.service';



@Component({
  selector: 'app-left-container',
  imports: [FontAwesomeModule],
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
  currenttime = new Date


  constructor(public weatherService: WeatherService) {
  }

  onClickSearch(location: string) {
    // console.log(location);
    this.weatherService.cityName = location;

  }
}
