//Variablen definieren
//Mit Werten gefüllt werden diese in der Funktion gotWeather
let sunrise;
let sunset;
let date;
let img;
let key = 'd3723b242a9a4d31be391638191101';

let input;
let button;
let ort;

function preload() {
    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=+Zürich&days=1';
    loadJSON(url, gotWeather);
}

function setup() {
    createCanvas(700, 700);
    //Dokumentation
    // https://www.apixu.com/doc/forecast.aspx
    createSearch();
}

function draw() {
    background(255);
    createTitle();
    createRectangle();
}

function createSearch() {
    input = createInput();
    input.position(20, 65);

    button = createButton('suchen');
    button.position(input.x + input.width, 65);
    button.mousePressed(getOrt);
}

function getOrt() {
    ort = input.value();
    let url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=+' + ort + '&days=1';

    loadJSON(url, gotWeather);
    createTitle(ort);
    input.value('');
}

function createTitle() {
    text(ort ? ort : "Zürich", 20, 250);
}

function gotWeather(weather) {
    let imgURL;

    sunrise = weather.forecast.forecastday[0].astro.sunrise;
    sunset = weather.forecast.forecastday[0].astro.sunset;
    date = weather.forecast.forecastday[0].date;

    imgURL = 'http:' + weather.forecast.forecastday[0].day.condition.icon;
    img = loadImage(imgURL);
}

function createRectangle() {

    colorMode(RGB);

    // sun
    let sunValue = 0.5;
    let SunColorfrom = color('#fff0a8');
    let SunColoeto = color('#f8b300');
    let sun = lerpColor(SunColorfrom, SunColoeto, sunValue);


    // niederschlag
    let rainValue = 0.9;
    let rainColorfrom = color('#a8d0e6');
    let rainColoeto = color('#24305e');
    let rain = lerpColor(rainColorfrom, rainColoeto, rainValue);


    // temperatur
    let tempValue = 0.2;
    let tempColorfrom = color('#27FB6B');
    let tempColoeto = color('#036D19');
    let temp = lerpColor(tempColorfrom, tempColoeto, tempValue);


    // wind
    let windValue = 0.5;
    let windColorfrom = color('#F397D6');
    let windColoeto = color('#231942');
    let wind = lerpColor(windColorfrom, windColoeto, windValue);

    noStroke();
    rect(100, 300, 400, 400);

    fill(sun);
    rect(100, 300, 200, 200);

    fill(rain);
    rect(300, 300, 200, 200);

    fill(temp);
    rect(100, 500, 200, 200);

    fill(wind);
    rect(300, 500, 200, 200);

}