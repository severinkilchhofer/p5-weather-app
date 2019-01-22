//Variablen definieren
//Mit Werten gefüllt werden diese in der Funktion gotWeather
let date;
let img;
let key = 'd3723b242a9a4d31be391638191101';

let input;
let button;

let uv;
let precip;
let temp;
let wind;
let textCoordinates;

let currentCities = [];
let randomCityKey;

let cities = ['Zürich', 'London', 'Tokyo', 'Berlin', 'Vancouver', 'Sydney'];

function preload() {
    setCities();
    let url;

    for (randomCityKey = 0; randomCityKey <= cities.length; randomCityKey++) {
        url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=+' + currentCities[randomCityKey] + '&days=1';
        loadJSON(url, gotWeather);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textCoordinates = 20;
    noLoop();
}

function draw() {
    background(255);
    createRectangle();
}

function setCities() {
    for (let i = 0; i <= cities.length; i++) {
        let randomCity = random(cities);
        currentCities.push(randomCity);
    }
}

function gotWeather(weather) {
    console.log('weather', weather.location);
    uv = weather.current.uv;
    precip = weather.current.precip_mm;
    temp = weather.current.temp_c;
    wind = weather.current.wind_kph;
}

function createRectangle() {

    colorMode(RGB);

    // sun
    let sunValue = uv;
    let SunColorfrom = color('#fff0a8');
    let SunColoeto = color('#f8b300');
    let sun = lerpColor(SunColorfrom, SunColoeto, sunValue);


    // precip
    let rainValue = precip;
    let rainColorfrom = color('#a8d0e6');
    let rainColoeto = color('#24305e');
    let rain = lerpColor(rainColorfrom, rainColoeto, rainValue);


    // temperatur
    let tempValue = temp / 100;
    let tempColorfrom = color('#27FB6B');
    let tempColoeto = color('#036D19');
    let temperature = lerpColor(tempColorfrom, tempColoeto, tempValue);


    // wind
    let windValue = wind / 100;
    let windColorfrom = color('#F397D6');
    let windColoeto = color('#231942');
    let windy = lerpColor(windColorfrom, windColoeto, windValue);

    noStroke();

    fill(sun);
    rect(100, 200, 100, 100);

    fill(rain);
    rect(200, 200, 100, 100);

    fill(temperature);
    rect(100, 300, 100, 100);

    fill(windy);
    rect(200, 300, 100, 100);


    for (let i = 0; i < cities.length; i++) {
        console.log(currentCities);
        text(currentCities[i], textCoordinates += 100, 500);
    }
}