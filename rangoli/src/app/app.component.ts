import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    //Color names to be randomly selected
    CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

    //map that contains characters seen already and their assigned color
    seen_chars = new Map();

    //initial rangoli
    rangoli_state = ['--------e--------',
                      '------e-d-e------',
                      '----e-d-c-d-e----',
                      '--e-d-c-b-c-d-e--',
                      'e-d-c-b-a-b-c-d-e',
                      '--e-d-c-b-c-d-e--',
                      '----e-d-c-d-e----',
                      '------e-d-e------',
                      '--------e--------'];

    //rangoli background color
    background_color = "#f3f3f3";

    //size of the rangoli pattern
    size = "10";

    //attributes to resize rangoli based on number of characters
    charLength = ((400)/(4*5))/(0.61);
    rowHeight = 400/9;
    rangoliHeight = 400;

    //url to get the new rangoli pattern
    url = 'https://wayscript.com/api?';

    //property to show the character color selection input
    charSelected: [boolean, string] = [false, null];

    updateBackground(color: string) {
        this.background_color = color;
        }

    updateSize(newSize: string) {
        this.size = newSize;
    }

    getRandomColor() {
        let ind = Math.floor(Math.random()*this.CSS_COLOR_NAMES.length)
        return this.CSS_COLOR_NAMES[ind]
        }

    setRangoliCharColors(arr: Array<string>) {
        for (let i = 0; i<arr.length; i++) {
            console.log(i)
            let line_arr = arr[i].split("")
            console.log(line_arr)
            for (let char of line_arr) {
                console.log(char);
                if(!this.seen_chars.has(char)) {
                    this.seen_chars.set(char, this.getRandomColor());
                }
            }
        }
        // console.log(this.seen_chars)
    }

    /*
    * An advanced setter method that is used in conjunction with getRangoli()
    * to wait until the Submit button is clicked to update the rangoli size
    * dynamically to match the new number of lines, shrinking the letters as
    * necessary using property binding to keep the rangoli approximately 400px
    * by 400 px. Before this function and the properties it updates were added,
    * the rangoli had variable size due to different numbers of characters
    * being used at a constant font-size - this now limits the difference in
    * size, reducing the need to scroll or resize the window.
    */
    setRangoliSize() {
        let newSize = parseInt(this.size);
        this.charLength = ((400)/(4*newSize))/(0.61); //0.61 is the aspect ratio of height to width
        //need to check if size < 15 due to minimum line-height value being ~14 pixels
        if(newSize < 15) {
            this.rowHeight = ((400/(2*newSize)));
            this.rangoliHeight = 400;
        }
        else {
            //use a standard of 16 pixels for heights of <p> elements if >15 characters used
            this.rowHeight = 16;
            this.rangoliHeight = 16*(2*newSize-1)
        }

    }

    getRangoli() {
        fetch(`https://wayscript.com/api?api_key=HRLP2pxChqSxV1uUFCnPeUo7OmXMTH0OePNsvb7OPww&program_id=8192&variables=${this.size}`
        ).then(response => {
            return response.json()
        })
        .then(json_result => {
            console.log(json_result);
            this.seen_chars.clear()
            this.rangoli_state = json_result.Result.body.results;
            this.setRangoliCharColors(this.rangoli_state);
            this.setRangoliSize();
            return this.rangoli_state;
    });}

    setLetterColor(char: string) {
        //want to open a menu to select a color for that character based on
        //the character chosen! Only if one character selected (some extra
        //space could be clicked right now)
        if(char.length === 1) this.charSelected = [true, char];
    }

    updateCharColor(char: string, color: string) {
        this.seen_chars.set(char, color);
        this.charSelected = [false, null];
    }

    updateCharColorRandom(char: string) {
        // below code to randomly get a color based on a click
        this.seen_chars.set(char, this.getRandomColor());
        this.charSelected = [false, null];
    }

    interval_var = null;

    cycleColors() {
        this.interval_var = setInterval(()=>{this.background_color = this.getRandomColor()},
        1000);
    }

    stopCycle() {
        clearInterval(this.interval_var);
        this.interval_var = null;
    }
}
