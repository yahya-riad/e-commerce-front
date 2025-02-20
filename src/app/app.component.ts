import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppModule} from "./app.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce-frontend';
}
