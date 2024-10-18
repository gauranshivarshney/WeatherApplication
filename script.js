let cityName = document.querySelector('.city');
let dateTime = document.querySelector('.date-time');
let forecast = document.querySelector('.forecast');
let icon = document.querySelector('.icon');
let weatherTemp = document.querySelector('.temp');
let cloud = document.querySelector('.cloud');
let humi = document.querySelector('.hum');
let win = document.querySelector('.wind');
let press = document.querySelector('.press');
let rise = document.querySelector('.rise');
let set = document.querySelector('.set');
let rains = document.querySelector('.rains');
let visi = document.querySelector('.visi');
let citySearch = document.querySelector('.search');

const getCountryName = (code) => {
    return new Intl.DisplayNames([code], {type: "region"}).of(code);
}

const getDateTime = (dt) => {
    const currDate = new Date(dt * 1000);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(currDate);
}

let city = "Delhi";
citySearch.addEventListener('submit', (e) => {
    e.preventDefault();
    let cityName = document.querySelector('.input-field');
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
});

const getWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d1a6049b4054a92625d4205fd8f7053b`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        const {main, name, weather, wind, sys, dt, clouds, rain, visibility} = data;
        const tempCelsius = (main.temp - 273.15);
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);
        forecast.innerHTML = weather[0].main;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
        weatherTemp.innerHTML = `${tempCelsius.toFixed(2)}&#176C`;
        cloud.innerHTML = `${clouds.all}%`;
        humi.innerHTML = `${main.humidity}%`;
        win.innerHTML = `${wind.speed} m/s`;
        press.innerHTML = `${main.pressure} hPa`;
        const riseTime = new Date(sys.sunrise * 1000).toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit'});
        const setTime = new Date(sys.sunset * 1000).toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit'});
        rise.innerHTML = `${riseTime}`;
        set.innerHTML = `${setTime}`;
        if(rain && rain['1h'])
            rains.innerHTML = `${rain['1h']} mm (last 1 hour)`;
        else if(rain && rain['3h'])
            rains.innerHTML = `${rain['3h']} mm (last 3 hours)`;
        else    
            rains.innerHTML = `No rain`;
        visi.innerHTML = `${visibility}`;
    }
    catch(error){
        console.log(error);
    }
}

document.body.addEventListener("load", getWeatherData());