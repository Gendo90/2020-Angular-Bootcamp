import { Component, HostListener } from '@angular/core';

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

    //code to listen for an "r" keypress to select a random color for that
    //character after clicking a character in the rangoli - essentially makes
    //"r" a shortcut key!
    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        console.log(event);
        if(event.code === "KeyR" && this.charSelected[0]===true) {
            this.updateCharColorRandom(this.charSelected[1]);
        }
    }

    //code to set the original rangoli colors
    @HostListener('window:load', ['$event'])
    setInitialRangoli(event: KeyboardEvent) {
        console.log(event);
        this.setRangoliCharColors(this.rangoli_state)
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

    color_loop_interval_var = null;
    loop_speed = "5"
    loop_direction = "inward"
    color_pattern = "repeating"

    //setter for loop_direction property - either inwward or outward!
    setCheckedDirection(val: string) {
        this.loop_direction = val;
    }

    //setter for color_pattern property - either repeating or random!
    setCheckedColors(val: string) {
        this.color_pattern = val;
    }

    //setter for loop_speed property
    updateLoopSpeed(newSpeed: string) {
        this.loop_speed = newSpeed;
    }

    //loops the colors inward or outward at a given speed
    //depending on the options selected
    loopColors() {
        let speed = parseInt(this.loop_speed);
        let chars = [...this.seen_chars.keys()].sort();

        if(this.loop_direction === "inward") {
            if(this.color_pattern === "repeating") {
                this.color_loop_interval_var = setInterval(() => {
                    let last_color = this.seen_chars.get(chars[1]);
                    for (let i = 1; i<chars.length; i++) {
                        if(i===chars.length-1) {
                            this.seen_chars.set(chars[i], last_color);
                        }
                        else {
                            this.seen_chars.set(chars[i], this.seen_chars.get(chars[i+1]));
                        }
                    }}, 1000/(speed))
                }
            else {
                this.color_loop_interval_var = setInterval(() => {
                    // let last_color = this.seen_chars.get(chars[1]);
                    for (let i = 1; i<chars.length; i++) {
                        if(i===chars.length-1) {
                            this.seen_chars.set(chars[i], this.getRandomColor());
                        }
                        else {
                            this.seen_chars.set(chars[i], this.seen_chars.get(chars[i+1]));
                        }
                    }}, 1000/(speed))
            }
        }
        else {
            if(this.color_pattern === "repeating") {
            this.color_loop_interval_var = setInterval(() =>{
                let first_color = this.seen_chars.get(chars[chars.length-1]);
                for (let i = chars.length-1; i>=1; i--) {
                    if(i===1) {
                        this.seen_chars.set(chars[1], first_color);
                    }
                    else {
                        this.seen_chars.set(chars[i], this.seen_chars.get(chars[i-1]));
                    }
                }}, 1000/(speed))
            }
            else {
                this.color_loop_interval_var = setInterval(() =>{
                    // let first_color = this.seen_chars.get(chars[chars.length-1]);
                    for (let i = chars.length-1; i>=1; i--) {
                        if(i===1) {
                            this.seen_chars.set(chars[1], this.getRandomColor());
                        }
                        else {
                            this.seen_chars.set(chars[i], this.seen_chars.get(chars[i-1]));
                        }
                    }}, 1000/(speed))
            }

        }
    }

    stopLooping() {
        clearInterval(this.color_loop_interval_var);
        this.color_loop_interval_var = null;
    }

    spinID = null;
    spin_rate = 3; //in Hz, get from input later

    setSpinID(val) {
        this.spinID = val;
    }

    spinRangoli() {
        let last = null;
        let element = document.getElementById("spin_sleeve")
        let last_angle = 0;
        let spinner = this.spinID;
        let rate = this.spin_rate;
        let root = this;

        function step(timestamp) {
          if(!last) last = timestamp;
          let progress = timestamp - last;
          last = timestamp;
          element.style.transform = 'rotate(' + last_angle + 'deg)';
          last_angle = (last_angle+(360.0*rate/1000)*progress)%360;
          root.spinID = window.requestAnimationFrame(step);
        }

        this.spinID = window.requestAnimationFrame(step);
    }

    stopRangoliSpin() {
        window.cancelAnimationFrame(this.spinID);
        this.spinID = null;
    }



}
