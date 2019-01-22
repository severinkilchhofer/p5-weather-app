let key = 'd3723b242a9a4d31be391638191101';

let uv;
let precip;
let temp;
let wind;

let textCoordinates;
let rectangleXSun;
let rectangleXRain;
let rectangleXTemp;
let rectangleXWind;

let currentWeather = [];
let currentCities = [];
let cities = ['Zürich', 'London', 'Tokyo', 'Berlin', 'Vancouver', 'Sydney', 'Stockholm', 'Helsinki', 'Beirut', 'Kapstadt', 'Edmonton', 'Montreal', 'Budapest', 'Rio De Janeiro'];

function preload() {
    setCities();
    let url;

    for (let cityKey = 0; cityKey <= 4; cityKey++) {
        url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=+' + currentCities[cityKey] + '&days=1';
        loadJSON(url, gotWeather);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textCoordinates = 0;
    rectangleXSun = 0;
    rectangleXRain = 100;
    rectangleXTemp = 0;
    rectangleXWind = 100;
    noLoop();
}

function draw() {
    background(255);
    createRectangle();
}

function setCities() {
    for (let i = 0; i <= 4; i++) {
        let randomCity = random(cities);
        currentCities.push(randomCity);
    }
}

function gotWeather(weather) {
    currentWeather.push(weather);
}

function createRectangle() {
    colorMode(RGB);

    for (let currentCity of currentCities) {

        const cityName = currentWeather.find(weather => weather.location.name === currentCity);

        uv = cityName.current.uv;
        precip = cityName.current.precip_mm;
        temp = cityName.current.temp_c;
        wind = cityName.current.wind_kph;

        // sun
        let sunValue = map(uv, 0, 10, 0, 1);
        let SunColorfrom = color('#fff0a8');
        let SunColoeto = color('#f8b300');
        let sun = lerpColor(SunColorfrom, SunColoeto, sunValue);


        // precip
        let rainValue = map(precip, 0, 3, 0, 1);
        let rainColorfrom = color('#a8d0e6');
        let rainColoeto = color('#24305e');
        let rain = lerpColor(rainColorfrom, rainColoeto, rainValue);


        // temperatur
        let tempValue = map(temp, -35, 40, 0, 1);
        let tempColorfrom = color('#99fbb8');
        let tempColoeto = color('#035117');
        let temperature = lerpColor(tempColorfrom, tempColoeto, tempValue);


        // wind
        let windValue = map(wind, 0, 80, 0, 1);
        let windColorfrom = color('#F397D6');
        let windColoeto = color('#231942');
        let windy = lerpColor(windColorfrom, windColoeto, windValue);

        noStroke();


        fill(sun);
        rect(rectangleXSun += 400, 350, 100, 100);

        fill(rain);
        rect(rectangleXRain += 400, 350, 100, 100);

        fill(temperature);
        rect(rectangleXTemp += 400, 450, 100, 100);

        fill(windy);
        rect(rectangleXWind += 400, 450, 100, 100);

        fill(0);
        textSize(20);
        text(cityName.location.name, textCoordinates += 400, 600);
    }
}