import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  includeLCLetters = false;
  includeUCLetters = false;
  includeNumbers = false;
  includeSymbols = false;
  pwLength = 0;
  password = "";

  //function that updates the includeLetters property used to determine
  //whether to include lowercase letters in the password
  onChangeUseLCLetters() {
      this.includeLCLetters = !this.includeLCLetters;
  }

  //function that updates the includeLetters property used to determine
  //whether to include uppercase letters in the password
  onChangeUseUCLetters() {
      this.includeUCLetters = !this.includeUCLetters;
  }

  //function that updates the includeNumbers property used to determine
  //whether to include numbers in the password
  onChangeUseNumbers() {
      this.includeNumbers = !this.includeNumbers;
  }

  //function that updates the includeSymbols property used to determine
  //whether to include symbols in the password
  onChangeUseSymbols() {
      this.includeSymbols = !this.includeSymbols;
  }

  //function that updates the pwLength property used to get the number of
  //characters to be used in the generated password
  onChangeLength(event: any) {
      const parsedVal = parseInt(event.target.value);

      if(!isNaN(parsedVal)) {
          this.pwLength = parsedVal;
      }
  }

  //function that generates a password when the "Generate!" button is clicked
  onButtonClick() {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      const uppercaseLetters = letters.toUpperCase()
      const numbers = "0123456789";
      const symbols = "!@#$%^&*()_-+";

      let validChars = '';
      if(this.includeLCLetters) {
          validChars += letters;
      }
      if(this.includeUCLetters) {
          validChars += uppercaseLetters;
      }
      if(this.includeNumbers) {
          validChars += numbers;
      }
      if(this.includeSymbols) {
          validChars += symbols;
      }

      let generatedPw = '';
      for (let i=0; i<this.pwLength; i++) {
          let index = Math.floor(Math.random() * validChars.length);
          generatedPw += validChars[index];
      }
      this.password = generatedPw;
  }

  //getter for retrieving the current password
  getPassword() {
      return this.password;
  }
}
