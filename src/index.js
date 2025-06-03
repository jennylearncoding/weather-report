"use strict";


// STATE TRACKING OBJECT
const state = {
  temperature: 60,
  cityName: null
};

// GLOBALLY ACCESSED VARIABLES
const temperature = document.getElementById('tempValue');
const landscape = document.getElementById('landscape');

// UPDATE TEMPERATURE FUCNTION + LANDSCAPE + COLOR
const updateTemperature = (direction) => {
  if (direction === 'increase') {
    state.temperature += 1;
  } else if (direction === 'decrease') {
    state.temperature -= 1;
  }
  temperature.textContent = state.temperature;

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
  } else if (state.color <= 49) {
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
    try {
      const result = await axios.get('http://localhost:5000/location', {
        params: {
          q: city
        }
      });
      const {lat, lon} = result.data[0];
      return {lat, lon};
    } catch(error) {
        console.log('Cannot get coordinates', error);
        return {};
    } 
};

// GET CURRENT WEATHER FROM WEATHER ENDPOINT USING LAT AND LON
const getOpenWeatherTemp = async ({lat, lon}) => {
    try {
      const result = await axios.get('http://localhost:5000/weather', { 
        params: {lat, lon}
      });
      return result.data.current.temp;
    } catch(error) {
        console.log('Cannot get current temperature', error);
        return null;
    } 
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
  // const getTempButton = document.getElementById('currentTempButton');
  // getTempButton.addEventListener('click', async () => {
  //   const city = document.getElementById('cityNameInput').value;
  //   const coordinates = await getLonLat(city);
  //   const temp = await getOpenWeatherTemp(coordinates);
  //   state.temperature = temp;
  //   temperature.textContent = state.temperature;
  // })
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
