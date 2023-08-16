const API_KEY = 'bcd567f5905181a666d8916e35432e12';
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');

cityForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const cityName = cityInput.value;
  getWeatherData(cityName);
});

function getWeatherData(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
      // Process and display current weather and forecast data
      displayCurrentWeather(data);
      displayForecast(data);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function displayCurrentWeather(data) {
    const cityName = data.city.name;
    const date = new Date(data.list[0].dt * 1000).toLocaleDateString();
    const iconCode = data.list[0].weather[0].icon;
    const temperatureKelvin = data.list[0].main.temp;
    const temperatureFahrenheit = Math.round((temperatureKelvin - 273.15) * 9/5 + 32); // Convert Kelvin to Fahrenheit
    const humidity = data.list[0].main.humidity;
    const windSpeed = data.list[0].wind.speed;
  
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  
    const currentWeatherHTML = `
      <h2>Current Weather in ${cityName}</h2>
      <p>Date: ${date}</p>
      <img src="${iconUrl}" alt="Weather Icon">
      <p>Temperature: ${temperatureFahrenheit}°F</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    `;
  
    currentWeatherContainer.innerHTML = currentWeatherHTML;
  }
  


  function displayForecast(data) {
    const forecastList = data.list;
    const forecastHTML = forecastList
      .filter((item, index) => index % 8 === 0) // Take every 8th item for daily forecast
      .map(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const iconCode = item.weather[0].icon;
        const temperatureKelvin = item.main.temp;
        const temperatureFahrenheit = Math.round((temperatureKelvin - 273.15) * 9/5 + 32);
        const windSpeed = item.wind.speed;
        const humidity = item.main.humidity;
  
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  
        return `
          <div class="col-md-2">
            <p>Date: ${date}</p>
            <img src="${iconUrl}" alt="Weather Icon">
            <p>Temperature: ${temperatureFahrenheit}°F</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Humidity: ${humidity}%</p>
          </div>
        `;
      })
      .join('');
  
    forecastContainer.innerHTML = forecastHTML;
  }
  
