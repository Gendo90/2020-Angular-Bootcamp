import { Component } from '@angular/core';
import { lorem } from "faker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  randomText = lorem.sentence();
  inputText = '';
  lastTyped = 0;
  show = true;

  getInputText(text: string) {
      if(text.length === this.lastTyped+1 || text.length <= this.lastTyped) {
          this.inputText = text;
          this.lastTyped = text.length;
      }
  }

  checkChar(char: string, i: number) {
      if(i < this.inputText.length) {
          return this.inputText[i] === char ? 'correct':'incorrect';
      }
      else
      {
          return 'undetermined';
      }
  }
}
