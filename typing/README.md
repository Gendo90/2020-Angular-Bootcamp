# Typing Test App

This project was created as part of the [The Modern Angular Bootcamp (2020)](https://www.udemy.com/course/the-modern-angular-bootcamp/)
in order to demonstrate the basic features of the Angular framework through an application.

I extended the original, basic functionality of the app so that it supports
typing tests for a single paragraph or multiple paragraphs in addition to a
single sentence. These tests now report typing speed and test duration
statistics upon completion. The typing speed is given in words per minute (wpm)
as well as characters per second (cps) because the language used for the tests
is Latin, and the average word length appears different than that of English,
so the wpm statistic does not directly carryover to other languages as well as
the cps statistic.

You can access and use the app [here](https://typing.patrickgendotti.now.sh/), and if you need help and want a more complete introduction to this application, you can view my YouTube tutorial for this app [here](https://www.youtube.com/watch?v=2QFYBnceafM&feature=youtu.be).

## Usage

The app is simple and intuitive to use - you just start typing in the input
or textarea element to start the test. Once you have started the test, you
should try to match the displayed text with your typed text as quickly as
possible to maximize your typing speed statistic.

The application currently only supports 100% accuracy mode, so the text must be matched perfectly or the
test will not finish - in other words, any errors in your typed input will
prevent you from completing the test. Fortunately, if you make a mistake, the
displayed text will show the error as a red, underlined letter or space, and
the app will sound an alert as long as your typed text does not match the
displayed text - but only up to the point you have typed.

Please note that pasting text into the input areas has been disabled to
ensure the speed statistics generated upon test completion are accurate and
representative of your typing speed!

## Test Modes

### Sentence

Type in a sentence as fast as you can! This test mode is the least accurate in
measuring your typing speed because it is the smallest sample size available
for testing your typing speed. However, you can use this mode to practice with
the app and understand how it works and what statistics it outputs better
before attempting a longer, more accurate typing test.

### Paragraph

Type in a full paragraph as fast as you can! This paragraph usually consists
of about four sentences, and is a more accurate measurement of typing speed
than the sentence test, but still less accurate than the "full test" that
uses three paragraphs. You can use this mode to get used to typing a full
paragraph of text before attempting the full test, as a step between the
sentence test and full test.

### Full Test (Three Paragraphs)

Type in three paragraphs as fast as you can! This test represents the most
accurate usage of typing in a more formal setting, where a single sentence or
paragraph is unlikely to be the extent of a typing project. Additionally, this
test should give the most accurate results of typing speed, since the
variations in sentence and word lengths become more standard over longer
passages of text, and the more text you must enter the closer you get to a
representative long duration, consistent typing speed statistic. If I ever
looked into giving a typing speed verification or badge from my app, this is
the test I would use to qualify users for a certain skill level.

## Dependencies

This application is built with the [Bulma](https://bulma.io/) HTML and CSS styling framework. It uses [Faker](https://www.npmjs.com/package/faker) in order to generate the random text for each test, and it uses [Howler](https://howlerjs.com/) to play the alert sound when the user input text does not match the displayed text. The overall framework for the application is [Angular](https://angularjs.org/) version 9.0.6 with [TypeScript](https://www.typescriptlang.org/) 3.7.5

## Further Development

One of the primary features to be added to this app is a different test mode
for a sentence, paragraph, or paragraphs that allows the user to complete the
test without 100% accuracy required, so that one of the statistics generated
upon test completion will be accuracy. This should allow faster typing speeds
to be reached for this test type, at the cost of some accuracy.
