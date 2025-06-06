import { Component } from '@angular/core';
import { LeftContainerComponent } from './left-container/left-container.component';
import { RightContainerComponent } from './right-container/right-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from "ngx-spinner";


@Component({
  selector: 'app-root',
  imports: [LeftContainerComponent, RightContainerComponent, FontAwesomeModule, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WheatherApp';
}
