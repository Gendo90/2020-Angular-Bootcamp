import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string;
  date: string;
  amount: number;
  //for custom pipe demonstration
  distance: number;

  onNameChange(value: string) {
      this.name = value;
  }

  onDateChange(value: string) {
      this.date = value;
  }

  onAmountChange(value: string) {
      this.amount = Number(value);
  }

  onDistanceChange(value: string) {
      this.distance = Number(value);
  }
}
