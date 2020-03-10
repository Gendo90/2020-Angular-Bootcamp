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
  textType = "sentence";

  getSentence() {
      this.randomText = lorem.sentence();
      this.inputText = '';
      this.textType = "sentence";
  }

  getParagraph() {
      this.randomText = lorem.paragraph();
      this.inputText = '';
      this.textType = "paragraph";
  }

  getParagraphs() {
      this.randomText = lorem.paragraphs();
      this.inputText = '';
      this.textType = "paragraphs";
  }

  getInputText(e: any) {
      let text = e.target.value;
      //prohibit pasting
      if (e.inputType === "insertFromPaste") {
            e.preventDefault();
            e.target.value = this.inputText;
        }
      //only add one letter at a time!
      else if(text.length === this.inputText.length+1) {
          this.inputText = text;
      }
      //allow multiple character deletions
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
