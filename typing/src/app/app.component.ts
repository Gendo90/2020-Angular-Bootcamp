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
  show = true;

  getInputText(text: string) {
      // console.log(text);
      this.inputText = text;
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
