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
    text("Am " + date + " ist der Sonnenaufgang um " + sunrise, 100, 100);
    icon();
    createTitle();
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

function icon() {
    image(img, 200, 200);
}