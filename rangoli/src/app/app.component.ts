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

    //url to get the new rangoli pattern
    url = 'https://wayscript.com/api?';

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
            return this.rangoli_state;
    });}

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
