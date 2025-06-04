"use strict";


// STATE TRACKING OBJECT
const state = {
  temperature: 60,
  cityName: null
};

// GLOBALLY ACCESSED VARIABLES
const temperature = document.getElementById('tempValue');
const landscape = document.getElementById('landscape');

// UPDATE TEMPERATURE FUNCTION + LANDSCAPE + COLOR
const updateTemperature = (direction) => {
  if (direction === 'increase') {
    state.temperature += 1;
  } else if (direction === 'decrease') {
    state.temperature -= 1;
  }
  temperature.textContent = state.temperature;
  updateTempStyles();
};

// UPDATE TEMPERATURE/LANDSCAPE FUNCTION
const updateTempStyles = () => {
  if (state.temperature >= 80) {
    temperature.style.color = 'red';
    landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temperature >= 70) {
    temperature.style.color = 'orange';
    landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temperature >= 60) {
    temperature.style.color = 'yellow';
    landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temperature >= 50) {
    temperature.style.color = 'green';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    temperature.style.color = 'teal';
    landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
};

// UPDATE CITY NAME FUNCTION
const updateCity = () => {
  const cityName = document.getElementById('headerCityName');
  const cityInput = document.getElementById('cityNameInput');
  cityName.textContent = cityInput.value; 
};

// GET LON AND LAT FROM LOCATION ENDPOINT
const getLonLat = async (city) => {
  console.log('stepping into getLonLat function')
    try {
      const result = await axios.get('http://localhost:5000/location', {
        params: {
          q: city
        }
      });
      const { lat, lon } = result.data[0];
      console.log('{ lat, lon }')
      return { lat, lon };
    } catch(error) {
        console.log('Cannot get coordinates', error);
        return {};
    } 
};

// GET CURRENT WEATHER FROM WEATHER ENDPOINT USING LAT AND LON
const getOpenWeatherTemp = async ({ lat, lon }) => {
    try {
      const result = await axios.get('http://localhost:5000/weather', { 
        params: { lat, lon, units: 'imperial' }
      });
      console.log('Weather data:', result.data);
      return result.data.main.temp;
    } catch(error) {
        console.log('Cannot get current temperature', error);
        return null;
    } 
};

// CHANGE THE SKY FUNCTION Sunny

const skySelect = document.getElementById('skySelect');
const sky = document.getElementById('sky');
const skies = {
  sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨'
};
const changeSkies = () => {
  const selectedSky = skySelect.value;
  sky.textContent = skies[selectedSky];
};

const registerEventHandlers = () => {
  // increase temperature
  const upButton = document.getElementById('increaseTempControl');
  upButton.addEventListener('click', () => updateTemperature('increase'));
  // decrease temperature
  const downButton = document.getElementById('decreaseTempControl');
  downButton.addEventListener('click', () =>  updateTemperature('decrease'));
  // city input
  const cityInput = document.getElementById('cityNameInput');
  cityInput.addEventListener('input', updateCity);
  // update the weather
  const getTempButton = document.getElementById('currentTempButton');
  getTempButton.addEventListener('click', async () => {
    const city = document.getElementById('cityNameInput').value;
    const coordinates = await getLonLat(city);
    const temp = await getOpenWeatherTemp(coordinates);
    console.log('Fetched temp:', temp);
    if (temp !== null) {
    const roundedTemp = Math.round(temp);
    state.temperature = roundedTemp;
    temperature.textContent = state.temperature;
    updateTempStyles();
    }
  })
  // sky change
  skySelect.addEventListener('change', changeSkies);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
