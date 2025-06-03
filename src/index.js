"use strict";

const dotEnv = require('dotenv');
dotEnv.config(); 
const LOCATIONIQ_KEY = process.env.LOCATION_API_KEY;
const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY;



const state = {
  temperature: 60,
  landscape: null,
  cityName: null
};

const temperature = document.getElementById('tempValue');
const landscape = document.getElementById('landscape');
const cityName = document.getElementById('headerCityName');


const increaseTemperature = () => {
  state.temperature += 1;
  temperature.textContent = state.temperature;
  tempTextColor(temperature);
  landscapeImg(temperature);
};

const decreaseTemp = () => {
  state.temperature -= 1;
  temperature.textContent = state.temperature;
  tempTextColor(temperature);
  landscapeImg(temperature);
};

const tempTextColor = (temperature) => {
    if (state.temperature >= 80) {
        temperature.style.color = 'red';
    } else if (state.temperature >= 70) {
        temperature.style.color = 'orange';
    } else if (state.temperature >= 60) {
        temperature.style.color = 'yellow';   
    } else if (state.temperature >= 50) {
        temperature.style.color = 'green';
    } else {
        temperature.style.color = 'teal';
    }
};

const landscapeImg = (temperature) => {
    if (state.temperature >= 80) {
        landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (state.temperature >= 70) {
        landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (state.temperature >= 60) {
        landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';   
    } else if (state.temperature >= 50) {
        landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } else {
        landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }
};

const updateCity = () => {
  const cityName = document.getElementById('headerCityName');
  const cityInput = document.getElementById('cityNameInput');
  cityName.textContent = cityInput.value; 
};

// getting lon and lat
const getLonLat = async (city) => {
    try {
      const result = await axios.get('https://us1.locationiq.com/v1/search', {
        key: LOCATIONIQ_KEY,
        q: city,
        format: 'json'
      });
      const {lat, lon} = result.data[0];
      return {lat, lon};
    } catch(error) {
        console.log('error in find location', error);
        return {};
    } 
};

// getting temperature using lat and lon
const getOpenWeatherTemp = async (coordinates) => {
    try {
      const {lat, lon} = coordinates;  
      const result = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
        appid: OPENWEATHER_KEY,
        units: 'imperial',
        lat, lon: coordinates
      });
      const temp = result.data.current.temp;
      return temp;
    } catch(error) {
        console.log('couldn\'t fetch the temperature', error);
        return null;
    } 
};


const registerEventHandlers = () => {
	// increasing the temperature
  const upArrow = document.getElementById('increaseTempControl');
  upArrow.addEventListener('click', increaseTemperature);
	// decrease the temperature
  const downArrow = document.getElementById('decreaseTempControl');
  downArrow.addEventListener('click', decreaseTemp);
    // update the city name
  const cityInput = document.getElementById('cityNameInput');
  cityInput.addEventListener('input', updateCity);
    // update the weather
  const getTempButton = document.getElementById('currentTempButton');
  getTempButton.addEventListener('click', async () => {
    const city = document.getElementById('cityNameInput').value;
    const coordinates = await getLonLat(city);
    const temp = await getOpenWeatherTemp(coordinates);
    state.temperature = temp;
    temperature.textContent = state.temperature;
  })
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
