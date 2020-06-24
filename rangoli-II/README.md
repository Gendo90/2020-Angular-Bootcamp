# Rangoli II App

This application was created as an extension of my original [Rangoli app](https://rangoli.patrickgendotti.now.sh/) that can be used to look for interesting color combinations.

Diamond patterns the hallmark of this rangoli design. In fact, each diamond pattern is set to a different random color automatically by the app, and can be manually changed by clicking on any colored rectangles in the diamond and subsequently setting the color. The background color for the rangoli can also be changed by clicking on the background to manually set the color or by cycling through the background colors randomly. The rangoli colors can be looped inward or outward at a given frequency, and they can also be randomly changing as the shift inward or outward if "<input type="radio"> random"  is selected instead of  "<input type="radio"> repeating". The rangoli can also be spun in a clockwise fashion at 3 Hz by clicking <button>Spin Rangoli!</button>

## Usage

The rangoli initially shown is a size 5 rangoli, and appears with randomized colors already selected. To generate a new rangoli, set the "Rangoli size" input to a value between 1 and 26, inclusive, and then click the "Submit" button. A new rangoli of the specified size with randomized colors should appear within a couple of seconds. These rangolis are always approximately the same size in the application, meaning that they occupy the same amount of screen space, with the individual character size expanding or shrinking depending on the number of characters used (e.g. a size 1 rangoli has the largest character size used, and a size 26 rangoli has the smallest character size used).

To change the background color of the rangoli, a user simply needs to select their desired color from the available options besides the "Set background color" text. The colors are listed in alphabetical order, and the background color of each option serves as a preview of the color.

To change the color of a character of the rangoli, a user simply needs to click on one of the characters and then select their desired color from the available options besides the "Set character color" text. The colors are listed in alphabetical order, and the background color of each option serves as a preview of the color. A random color can also be set by clicking the "Random" button, or by hitting the 'r' key on the keyboard as a shortcut. Setting the color for one character will change the color of all identical characters to the new color.

To randomly cycle through background colors for a particular rangoli, click  <button>Cycle Background Colors!</button> button. This action will cause the background colors of the rangoli to randomly change to different colors, which can allow the user to see an array of different color combinations clearly for optimal color selection and coordination, and also to view interesting patterns possible given the different colors of each diamond and how they interact with their spacing and neighboring diamond pattern colors. I personally think rangolis of size 10-15 are the best for color selection since the letters are large enough for the contrast or blend to be clearly seen and there are lots of colors that can be compared, but larger rangolis are also useful for seeing how the different diamond colors can form patterns.

The rangoli can cycle the colors in the diamond patterns inward by selecting the options "inward" and "repeating" and the colors will loop through the inner diamond patterns towards the center. An example is shown below, for a setting of Rangoli size at 15 and frequency at 5 Hz.

<div style="text-align:center"><img src="src/assets/example_loop_inward.gif"></div>


Similarly, the rangoli can cycle the colors in the diamond patterns outward by selecting the options "outward" and "repeating" and the colors will loop through the outer diamond patterns towards the border pattern. An example is shown below, for a setting of Rangoli size at 15 and frequency at 5 Hz.

<div style="text-align:center"><img src="src/assets/outward_repeat.gif"></div>

Similarly, the rangoli can cycle the colors in the diamond patterns inward or outward without looping the colors (adding one new color each time the colors shift) by selecting the "random" option. Examples of inward shifting and outward shifting random colors are shown below, for a setting of Rangoli size at 15 and frequency at 5 Hz.

<div style="text-align:center">
    <img src="src/assets/inward_change_example.gif">
    <img src="src/assets/outward_random.gif">
</div>

## Dependencies

This application is built using the [Angular](https://angularjs.org/) version 8.2.14 framework with [TypeScript](https://www.typescriptlang.org/) 3.5.3 and also uses the [WayScript](https://wayscript.com/) service to run a Python script to generate the rangolis using a custom API.

## Further Development

A major update will be deprecating the WayScript API endpoint by storing all the possible rangolis (sizes 1 through 26) in a JSON file and then loading a specific size rangoli upon user request, instead of querying the WayScript server, since that should accelerate the rangoli generation time so a user does not need to wait a couple of seconds for the rangoli to load, and also to reduce the number of unnecessary dependencies.

Another update will involve adding custom spin frequencies to the application, so that the spin rate can be set by the user.

The rangoli app will also likely be modified at some point to include a transparency setting, so that the colors can be blended with the background better, almost like a color filter on a window or other light source.

At some point, the layout will also be upgraded to use a more professional, stylized interface with an HTML and CSS framework like Bulma or Bootstrap.
