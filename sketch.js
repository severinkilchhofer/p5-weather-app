let key = '4e56ea0ee1cd495e9f7204749192301';

let uv;
let precip;
let temp;
let wind;

let moonIcon;
let sunIcon;

let textCoordinates;
let textCoordinates2;
let iconCoordinates;
let iconCoordinates2;

let rectangleXSun;
let rectangleXRain;
let rectangleXTemp;
let rectangleXWind;
let rectangleXSun2;
let rectangleXRain2;
let rectangleXTemp2;
let rectangleXWind2;

let currentWeather = [];
let currentCities = [];
let cities = ['Zürich', 'London', 'Tokyo', 'Berlin', 'Vancouver', 'Sydney', 'Stockholm', 'Helsinki', 'Beirut', 'Kapstadt',
    'Edmonton', 'Montreal', 'Budapest', 'Rio De Janeiro', 'Lima', 'Kapstadt', 'Reykjavik', 'Miami', 'Marrakesh', 'Nairobi', 'Phuket', 'Oslo', 'Alice Springs'];

function preload() {
    setCities();
    let url;

    for (let cityKey = 0; cityKey <= 5; cityKey++) {
        url = 'https://api.apixu.com/v1/forecast.json?key=' + key + '&q=+' + currentCities[cityKey] + '&days=1';
        loadJSON(url, gotWeather);
    }

    moonIcon = loadImage('assets/moon.svg'); // Load the image
    sunIcon = loadImage('assets/sun.svg'); // Load the image
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    iconCoordinates = 0;
    iconCoordinates2 = 0;
    textCoordinates = 0;
    textCoordinates2 = 0;

    rectangleXSun = 0;
    rectangleXRain = 150;
    rectangleXTemp = 0;
    rectangleXWind = 150;

    rectangleXSun2 = 0;
    rectangleXRain2 = 150;
    rectangleXTemp2 = 0;
    rectangleXWind2 = 150;
    noLoop();
}

function draw() {
    background(30, 30, 30);
    createRectangle();
}

function setCities() {
    for (let i = 0; i <= 5; i++) {
        let randomCity = random(cities);

        if (!currentCities.includes(randomCity)) {
            currentCities.push(randomCity);
        } else {
            i--;
        }
    }
}

function gotWeather(weather) {
    currentWeather.push(weather);
}

function createRectangle() {
    colorMode(RGB);

    let upperRow = 0;
    let lowerRow = 0;

    for (let currentCity of currentCities) {

        upperRow++;

        let cityName = currentWeather.find(weather => weather.location.name === currentCity);
        let day = cityName.current.is_day;

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
        let tempColorfrom = color('#fbb7a2');
        let tempColoeto = color('#8c0721');
        let temperature = lerpColor(tempColorfrom, tempColoeto, tempValue);


        // wind
        let windValue = map(wind, 0, 80, 0, 1);
        let windColorfrom = color('#14f3b4');
        let windColoeto = color('#004234');
        let windy = lerpColor(windColorfrom, windColoeto, windValue);


        let rectangleWidth = 150;

        let yHoehe1 = 0;
        let yHoehe2 = yHoehe1 + rectangleWidth;

        let yHoehe3 = 400;
        let yHoehe4 = yHoehe3 + rectangleWidth;

        let fontHoehe1 = 345;
        let fontHoehe2 = 745;

        let iconHoehe1 = fontHoehe1 - 20;
        let iconHoehe2 = fontHoehe2 - 20;

        noStroke();

        if (upperRow <= 3) {

            if (upperRow === 1) {
                fill(sun);
                rect(rectangleXSun += 150, yHoehe1, rectangleWidth, rectangleWidth);

                fill(rain);
                rect(rectangleXRain += 150, yHoehe1, rectangleWidth, rectangleWidth);

                fill(temperature);
                rect(rectangleXTemp += 150, yHoehe2, rectangleWidth, rectangleWidth);

                fill(windy);
                rect(rectangleXWind += 150, yHoehe2, rectangleWidth, rectangleWidth);

                fill(255);
                textSize(20);
                text(cityName.location.name, textCoordinates += 150, fontHoehe1);
                if (day === 1) {
                    image(sunIcon, iconCoordinates += 420, iconHoehe1, 25, 25);
                } else {
                    image(moonIcon, iconCoordinates += 420, iconHoehe1, 30, 30);
                }
            } else {
                fill(sun);
                rect(rectangleXSun += 500, yHoehe1, rectangleWidth, rectangleWidth);

                fill(rain);
                rect(rectangleXRain += 500, yHoehe1, rectangleWidth, rectangleWidth);

                fill(temperature);
                rect(rectangleXTemp += 500, yHoehe2, rectangleWidth, rectangleWidth);

                fill(windy);
                rect(rectangleXWind += 500, yHoehe2, rectangleWidth, rectangleWidth);

                fill(255);
                textSize(20);
                text(cityName.location.name, textCoordinates += 500, fontHoehe1);
                if (day === 1) {
                    image(sunIcon, iconCoordinates += 500, iconHoehe1, 25, 25);
                } else {
                    image(moonIcon, iconCoordinates += 500, iconHoehe1, 30, 30);
                }
            }

        } else {
            lowerRow++;
            if (lowerRow === 1) {
                fill(sun);
                rect(rectangleXSun2 += 150, yHoehe3, rectangleWidth, rectangleWidth);

                fill(rain);
                rect(rectangleXRain2 += 150, yHoehe3, rectangleWidth, rectangleWidth);

                fill(temperature);
                rect(rectangleXTemp2 += 150, yHoehe4, rectangleWidth, rectangleWidth);

                fill(windy);
                rect(rectangleXWind2 += 150, yHoehe4, rectangleWidth, rectangleWidth);

                fill(255);
                textSize(20);
                text(cityName.location.name, textCoordinates2 += 150, fontHoehe2);
                if (day === 1) {
                    image(sunIcon, iconCoordinates2 += 420, iconHoehe2, 25, 25);
                } else {
                    image(moonIcon, iconCoordinates2 += 420, iconHoehe2, 30, 30);
                }
            } else {
                fill(sun);
                rect(rectangleXSun2 += 500, yHoehe3, rectangleWidth, rectangleWidth);

                fill(rain);
                rect(rectangleXRain2 += 500, yHoehe3, rectangleWidth, rectangleWidth);

                fill(temperature);
                rect(rectangleXTemp2 += 500, yHoehe4, rectangleWidth, rectangleWidth);

                fill(windy);
                rect(rectangleXWind2 += 500, yHoehe4, rectangleWidth, rectangleWidth);

                fill(255);
                textSize(20);
                text(cityName.location.name, textCoordinates2 += 500, fontHoehe2);
                if (day === 1) {
                    image(sunIcon, iconCoordinates2 += 500, iconHoehe2, 25, 25);
                } else {
                    image(moonIcon, iconCoordinates2 += 500, iconHoehe2, 30, 30);
                }
            }
        }
    }
}
