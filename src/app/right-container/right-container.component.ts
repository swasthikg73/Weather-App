import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faL, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../services/weather.service';



@Component({
  selector: 'app-right-container',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './right-container.component.html',
  styleUrl: './right-container.component.css'
})
export class RightContainerComponent {

  today: boolean = false;
  week: boolean = true;


  faThumbsUp: any = faThumbsUp;
  faThumbsDown: any = faThumbsDown;
  faFacesmile: any = faFaceSmile;

  //variables to control UI
  celsius: boolean = true;
  fahrenhiet: boolean = false;

  constructor(public weatherService: WeatherService) {

  }
  //function to control tab states
  onClickToday() {
    this.today = true;
    this.week = false;
  }

  onClickWeek() {
    this.today = false;
    this.week = true;
  }

  //function to control metric states
  onClickCelsius() {
    this.celsius = true;
    this.fahrenhiet = false;
    this.weatherService.celsius = true;
    this.weatherService.fahrenhiet = false;
  }
  onClickFahrenhiet() {
    this.celsius = false;
    this.fahrenhiet = true;
    this.weatherService.celsius = false;
    this.weatherService.fahrenhiet = true;
  }


}
