let key = '4e56ea0ee1cd495e9f7204749192301';

let uv;
let precip;
let temp;
let wind;

let textCoordinates;
let rectangleXSun;
let rectangleXRain;
let rectangleXTemp;
let rectangleXWind;
let rectangleXStart = 0;
let rectangleXEnd = 0;

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
    background(30, 30, 30);
    createRectangle();

    // createCircles();
    // createDots();
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
        let tempColorfrom = color('#fbb7a2');
        let tempColoeto = color('#8c0721');
        let temperature = lerpColor(tempColorfrom, tempColoeto, tempValue);


        // wind
        let windValue = map(wind, 0, 80, 0, 1);
        let windColorfrom = color('#14f3b4');
        let windColoeto = color('#004234');
        let windy = lerpColor(windColorfrom, windColoeto, windValue);

        noStroke();


        fill(sun);
        rect(rectangleXSun += 300, 350, 100, 100);

        fill(rain);
        rect(rectangleXRain += 300, 350, 100, 100);

        fill(temperature);
        rect(rectangleXTemp += 300, 450, 100, 100);

        fill(windy);
        rect(rectangleXWind += 300, 450, 100, 100);

        fill(255);
        textSize(20);
        text(cityName.location.name, textCoordinates += 300, 600);
    }
}

// v2
function createCircles() {
    colorMode(RGB, 255, 255, 255, 1);

    let sun;

    for (let currentCity of currentCities) {

        const cityName = currentWeather.find(weather => weather.location.name === currentCity);

        uv = cityName.current.uv;
        precip = cityName.current.precip_mm;
        temp = cityName.current.temp_c;
        wind = cityName.current.wind_kph;

        // sun
        let sunValueMap = map(uv, 0, 10, 0, 1);
        let SunColorfrom = color('#fff0a8');
        let SunColoeto = color('#f8b300');
        sun = lerpColor(SunColorfrom, SunColoeto, sunValueMap);


        // precip
        let rainValueMap = map(precip, 0, 3, 0, 1);
        let rainValue = precip;
        let rainColorfrom = color('#a8d0e6');
        let rainColoeto = color('#24305e');
        let rain = lerpColor(rainColorfrom, rainColoeto, rainValueMap);


        // temperatur
        let tempValueMap = map(temp, -35, 40, 0, 1);
        let tempValue = temp;
        let tempColorfrom = color('#99fbb8');
        let tempColoeto = color('#035117');
        let temperature = lerpColor(tempColorfrom, tempColoeto, tempValueMap);


        // wind
        let windValueMap = map(wind, 0, 80, 0, 1);
        let windValue = wind;
        let windColorfrom = color('#F397D6');
        let windColoeto = color('#231942');
        let windy = lerpColor(windColorfrom, windColoeto, windValueMap);

        noStroke();

        let strokeSun = sunValueMap * 100;
        let strokeRain = rainValue * 20;
        let strokeTemperature = tempValue * 2;
        let strokeWind = windValue / 10;
        console.log(windValue);

        //sun
        noFill();
        stroke(sun);
        strokeWeight(strokeSun);
        ellipse(rectangleXStart += 300, 350, 100, 100);


        // rain
        stroke(rain);
        strokeWeight(strokeRain);
        ellipse(rectangleXStart, 350, 100, 100);
        // line(rectangleXRain += 300, 350, rectangleXRain, 100);
        // line(30, 20, 85, 75);
        // rect(rectangleXRain += 300, 350, 100, 100);

        stroke(temperature);
        strokeWeight(strokeTemperature);
        ellipse(rectangleXStart, 350, 100, 100);
        // rect(rectangleXTemp += 300, 450, 100, 100);
        // line(rectangleXTemp += 300, 350, rectangleXTemp, rectangleXTemp - 100);

        stroke(windy);
        strokeWeight(strokeWind);
        ellipse(rectangleXStart, 350, 100, 100);

        noStroke();
        fill(0);
        textSize(20);
        text(cityName.location.name, textCoordinates += 300, 600);


    }
}

// v3
function createDots() {
    colorMode(RGB, 255, 255, 255, 1);

    let sun;
    let circles = [];
    let protection = 0;

    for (let currentCity of currentCities) {

        console.log('createDots');

        const cityName = currentWeather.find(weather => weather.location.name === currentCity);

        uv = cityName.current.uv;
        precip = cityName.current.precip_mm;
        temp = cityName.current.temp_c;
        wind = cityName.current.wind_kph;

        // sun
        let sunValueMap = map(uv, 0, 10, 0, 1);
        let SunColorfrom = color('#fff0a8');
        let SunColoeto = color('#f8b300');
        sun = lerpColor(SunColorfrom, SunColoeto, sunValueMap);


        // precip
        let rainValueMap = map(precip, 0, 3, 0, 1);
        let rainValue = precip;
        let rainColorfrom = color('#a8d0e6');
        let rainColoeto = color('#24305e');
        let rain = lerpColor(rainColorfrom, rainColoeto, rainValueMap);


        // temperatur
        let tempValueMap = map(temp, -35, 40, 0, 1);
        let tempValue = temp;
        let tempColorfrom = color('#99fbb8');
        let tempColoeto = color('#035117');
        let temperature = lerpColor(tempColorfrom, tempColoeto, tempValueMap);


        // wind
        let windValueMap = map(wind, 0, 80, 0, 1);
        let windValue = wind;
        let windColorfrom = color('#F397D6');
        let windColoeto = color('#231942');
        let windy = lerpColor(windColorfrom, windColoeto, windValueMap);

        // noStroke();
        //
        // let strokeSun = sunValueMap * 100;
        // let strokeRain = rainValue * 20;
        // let strokeTemperature = tempValue * 2;
        // let strokeWind = windValue / 10;
        // console.log(windValue);

        // //sun
        // noFill();
        // stroke(sun);
        // strokeWeight(strokeSun);
        // ellipse(rectangleXStart += 300, 350, 100, 100);
        //
        //
        // // rain
        // stroke(rain);
        // strokeWeight(strokeRain);
        // ellipse(rectangleXStart, 350, 100, 100);
        // // line(rectangleXRain += 300, 350, rectangleXRain, 100);
        // // line(30, 20, 85, 75);
        // // rect(rectangleXRain += 300, 350, 100, 100);
        //
        // stroke(temperature);
        // strokeWeight(strokeTemperature);
        // ellipse(rectangleXStart, 350, 100, 100);
        // // rect(rectangleXTemp += 300, 450, 100, 100);
        // // line(rectangleXTemp += 300, 350, rectangleXTemp, rectangleXTemp - 100);
        //
        // stroke(windy);
        // strokeWeight(strokeWind);
        // ellipse(rectangleXStart, 350, 100, 100);
        //
        // noStroke();
        // fill(0);
        // textSize(20);
        // text(cityName.location.name, textCoordinates += 300, 600);


        circleMaker();

    }

    function circleMaker() {

        console.log('circleMaker');
        // Try to get to 500
        while (circles.length < 500) {
            // Pick a random circle
            var circle = {
                // x: random(rectangleXStart += 300, rectangleXEnd += 500),
                x: random(300, 500),
                y: random(height - 100),
                r: random(6, 10)
            };

            // Does it overlap any previous circles?
            var overlapping = false;
            for (var j = 0; j < circles.length; j++) {
                var other = circles[j];
                var d = dist(circle.x, circle.y, other.x, other.y);
                if (d < circle.r + other.r) {
                    overlapping = true;
                }
            }

            // If not keep it!
            if (!overlapping) {
                circles.push(circle);
            }

            // Are we stuck?
            protection++;
            if (protection > 10000) {
                break;
            }
        }

        // Draw all the circles
        for (var i = 0; i < circles.length; i++) {
            fill(sun);
            console.log('start', rectangleXStart);
            console.log('end', rectangleXEnd);
            noStroke();
            ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
        }
    }

}