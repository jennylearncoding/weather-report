"use strict";

// STATE TRACKING OBJECT
const state = {
  temperature: 60
};


// DOM VARIABLES
const temperature = document.getElementById('tempValue');
const cityInput = document.getElementById('cityNameInput');
const landscape = document.getElementById('landscape');
const skySelect = document.getElementById('skySelect');
const sky = document.getElementById('sky');
const cityName = document.getElementById('headerCityName');
const upButton = document.getElementById('increaseTempControl');
const downButton = document.getElementById('decreaseTempControl');
const getTempButton = document.getElementById('currentTempButton');
const cityReset = document.getElementById('cityNameReset');


// ART OBJECTS
const skies = {
sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨'
};

const landscapes = {
  red: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  orange: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  yellow: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
  green: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
  teal: '🌲⛄️🌲⛄️🌲⛄️🌲⛄️🌲⛄️🌲⛄️🌲'
};


// UPDATE TEMPERATURE AND LANDSCAPE LOGIC BASED ON TEMPERATURE
const updateTempStyles = () => {
  if (state.temperature >= 80) {
    temperature.style.color = 'red';
    landscape.textContent = landscapes.red;
  } else if (state.temperature >= 70) {
    temperature.style.color = 'orange';
    landscape.textContent = landscapes.orange;
  } else if (state.temperature >= 60) {
    temperature.style.color = 'yellow';
    landscape.textContent = landscapes.yellow;
  } else if (state.temperature >= 50) {
    temperature.style.color = 'green';
    landscape.textContent = landscapes.green;
  } else {
    temperature.style.color = 'teal';
    landscape.textContent = landscapes.teal;
  }
};


// CHANGE THE SKY
const changeSkies = () => {
  const selectedSky = skySelect.value;
  sky.textContent = skies[selectedSky];
};


// UPDATE TEMPERATURE MANUALLY
const updateTemperature = (direction) => {
  if (direction === 'increase') {
    state.temperature += 1;
  } else if (direction === 'decrease') {
    state.temperature -= 1;
  }
  temperature.textContent = state.temperature;
  updateTempStyles();
};


// UPDATE CITY NAME /  RESET CITY TO DEFAULT LOGIC
const updateCity = () => {
  cityName.textContent = cityInput.value; 
};

const resetCity = () => {
  cityInput.value = 'Paris';
  updateCity();
};


// GETTING CURRENT TEMPERATURE LOGIC / CONVERT TEMPERATURE FROM KELVIN TO FAHRENHEIT (K - 273.15) * 9/5 + 32
const getLonLat = async (city) => {
    try {
      const result = await axios.get('http://localhost:5000/location', {
        params: {
          q: city
        }
      });
      const { lat, lon } = result.data[0];
      return { lat, lon };
    } catch(error) {
        console.log('Cannot get coordinates', error);
        return {};
    } 
};

const getOpenWeatherTemp = async ({ lat, lon }) => {
    try {
      const result = await axios.get('http://localhost:5000/weather', { 
        params: { lat, lon }
      });
      return convertTemp(result.data.main.temp);
    } catch(error) {
        console.log('Cannot get current temperature', error);
        return null;
    } 
};

const convertTemp = temp => {
  const fahrenheitTemp = (temp - 273.15) * 9/5 + 32;
  return Math.round(fahrenheitTemp);
};


// REGISTER EVENTS
const registerEventHandlers = () => {
  // increase temperature
  upButton.addEventListener('click', () => updateTemperature('increase'));
  // decrease temperature
  downButton.addEventListener('click', () =>  updateTemperature('decrease'));
  // city input
  cityInput.addEventListener('input', updateCity);
  // update the weather
  getTempButton.addEventListener('click', async () => {
    const city = cityInput.value;
    const coordinates = await getLonLat(city);
    const temp = await getOpenWeatherTemp(coordinates);
    if (temp !== null) {
    state.temperature = temp;
    temperature.textContent = state.temperature;
    updateTempStyles();
    }
  })
  // sky change
  skySelect.addEventListener('change', changeSkies);
  // reset city
  cityReset.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
