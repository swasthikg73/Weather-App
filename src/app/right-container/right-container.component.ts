import { Component } from '@angular/core';

@Component({
  selector: 'app-right-container',
  imports: [],
  templateUrl: './right-container.component.html',
  styleUrl: './right-container.component.css'
})
export class RightContainerComponent {

  today: boolean = false;
  week: boolean = true;

  //variables to control metric value
  celsius: boolean = true;
  fahrenhiet: boolean = false;

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
  }
  onClickFahrenhiet() {
    this.celsius = false;
    this.fahrenhiet = true;
  }


}
