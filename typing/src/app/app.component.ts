import { Component } from '@angular/core';
import { lorem } from "faker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  randomText = lorem.sentence();
  randomTextArr = [this.randomText];
  //initialize the word count per paragraph, a little faster than counting
  //each time
  cumulativeWordCountMap = new Map([[0, 0]]);
  inputText = '';
  show = true;
  textType = "sentence";
  currentTime = this.getTime();
  wpm;
  timeElapsedMin;
  timeElapsedSec;
  //flag to add a button to debug randomText vs. inputText
  debugging = false;

  setWordCountMap() {
      this.cumulativeWordCountMap.clear();
      for (let i=0; i< this.randomTextArr.length; i++) {
          if(i===0) {
              this.cumulativeWordCountMap.set(0, 0);
          }
          else {
              this.cumulativeWordCountMap.set(i, this.randomTextArr[i-1].length + this.cumulativeWordCountMap.get(i-1));
          }
      }
  }

  getSentence() {
      this.resetInput();
      this.randomTextArr = [];
      this.randomText = lorem.sentence();
      this.randomTextArr.push(this.randomText);
      this.setWordCountMap()
      this.inputText = '';
      this.textType = "sentence";
  }

  getParagraph() {
      this.resetInput();
      this.randomTextArr = [];
      this.randomText = lorem.paragraph();
      this.randomTextArr.push(this.randomText);
      this.setWordCountMap()
      this.inputText = '';
      this.textType = "paragraph";
  }

  getParagraphs() {
      this.resetInput();
      this.randomTextArr = [];
      this.randomText = "";
      let test = lorem.paragraphs();
      //remove the carriage returns (left over from the paragraph generator)
      while (test.includes("\r")) {
          test = test.replace('\r', "");
      }
      let test2 = test.split('\n');
      for (let i = 0; i<test2.length; i++) {
          if(i!=0) {
              //remove the leading space, took a while to find it!
              test2[i] = test2[i].replace(" ", "");
          }
          //add line breaks for all paragraphs other than the last
          if(i<test2.length-1) {
              this.randomText+= (test2[i] + '\n\n');
              this.randomTextArr.push((test2[i]+"\n\n"));
          }
          else {
              this.randomText+=test2[i]
              this.randomTextArr.push((test2[i]));
          }
      }

      this.setWordCountMap()
      this.inputText = '';
      this.textType = "paragraphs";
  }

  getTime() {
      return Number(new Date());
  }

  startTest() {
      this.getParagraphs();
      this.currentTime = this.getTime();
  }

  startPracticeTest() {
      this.getParagraph();
      this.currentTime = this.getTime();
  }

  startSentenceQuiz() {
      this.getSentence();
      this.currentTime = this.getTime();
  }

  resetInput() {
      if(this.textType === 'sentence') {
          document.querySelector("input").value = '';
      }
      else {
          document.querySelector("textarea").value = '';
      }
  }

  endTest() {
      let timeElapsed = (this.getTime() - this.currentTime)/1000;
      this.timeElapsedMin = Math.floor(timeElapsed/60);
      this.timeElapsedSec = (timeElapsed/60 - this.timeElapsedMin)*60;
      let wordArray = this.randomText.split(" ");
      //Need to adjust wordArray.length by the number of paragraphs besides the
      //first, because the split function misses the paragraph start word as a
      //separate word due to '\n' being the delimiter
      this.wpm = (wordArray.length + this.randomTextArr.length-1)/(timeElapsed/60);
      this.resetInput()
      this.currentTime = this.getTime();

      return true;
  }

  getInputText(e: any) {
      let text = e.target.value;
      //prohibit pasting
      if (e.inputType === "insertFromPaste") {
            e.preventDefault();
            e.target.value = this.inputText;
        }
      //only add one letter at a time!
      else if(text.length === this.inputText.length+1 || (e.target.value === '\n')) {
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

  findDifference() {
      let difference = ""
      let i = 0;
      while (i<this.randomText.length && i < this.inputText.length) {
          if(this.randomText[i]!==this.inputText[i]) {
              difference += this.randomText[i] + " vs. " + this.inputText[i] + " at " + i + '\n';
          }
          i++;
      }
      console.log(difference);
  }

  checkChar(char: string, i: number, j: number) {
      //shift is simpler now - no for loops!
      let shift = this.cumulativeWordCountMap.get(i);
      if(j + shift < this.inputText.length) {
          return this.inputText[j + shift] === char ? 'correct':'incorrect';
      }
      else
      {
          return 'undetermined';
      }
  }
}
