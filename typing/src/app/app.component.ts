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

  getInputText(e: any) {
      let text = e.target.value;
      console.log(e)
      console.log(e.inputType)
      if (e.inputType === "insertFromPaste") {
            e.preventDefault();
            e.target.value = this.inputText;
        }
      else if(text.length === this.inputText.length+1) {
          this.inputText = text;
      }
      else if(text.length <= this.inputText.length-1) {
          this.inputText = text;
      }
  }


  showInputText() {
      return this.inputText;
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
