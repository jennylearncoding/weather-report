"use strict";


const state = {
  temperature: 60,
	landscape: null
};

const temperature = document.getElementById('tempValue');
const landscape = document.getElementById('landscape');

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
// const increaseTemperature = document.getElementById('increaseTempControl')


// access to the up-arrow, click event , run the function 

const registerEventHandlers = () => {
	// increasing the temperature
  const upArrow = document.getElementById('increaseTempControl');
  upArrow.addEventListener('click', increaseTemperature);
	// decrease the temperature
  const downArrow = document.getElementById('decreaseTempControl');
  downArrow.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
