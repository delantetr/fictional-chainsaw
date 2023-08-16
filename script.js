const API_KEY = 'bcd567f5905181a666d8916e35432e12';
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');

cityForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const cityName = cityInput.value;
  getWeatherData(cityName);
  cityInput.value = '';
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
    const temperatureFahrenheit = Math.round((temperatureKelvin - 273.15) * 9/5 + 32);
    const humidity = data.list[0].main.humidity;
    const windSpeed = data.list[0].wind.speed;
  
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  
    const currentWeatherHTML = `
      <div>
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Current Weather in ${cityName}</h2>
            <p class="card-text">Date: ${date}</p>
            <img src="${iconUrl}" alt="Weather Icon" class="card-img-sm">
            <p class="card-text">Temperature: ${temperatureFahrenheit}°F</p>
            <p class="card-text">Humidity: ${humidity}%</p>
            <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
          </div>
        </div>
      </div>
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
          <div>
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">${date}</h5>
                <img src="${iconUrl}" alt="Weather Icon" class="card-img-sm">
                <p class="card-text">Temperature: ${temperatureFahrenheit}°F</p>
                <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
                <p class="card-text">Humidity: ${humidity}%</p>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  
    forecastContainer.innerHTML = `
      <div class="row">
        ${forecastHTML}
      </div>
    `;
  }
  
  
  
  const searchHistoryContainer = document.getElementById('search-history');

    // Store the list of previously searched cities (for demonstration purposes)
    let searchHistoryList = [];

    // Function to display the list of previously searched cities
    function displaySearchHistory() {
    const searchHistoryHTML = searchHistoryList
        .map(cityName => `<button class="btn btn-secondary mb-2 search-history-btn">${cityName}</button>`)
        .join('');

    searchHistoryContainer.innerHTML = `
        <h2 class="mb-3">Search History</h2>
        ${searchHistoryHTML}
    `;

    // Attach click event listeners to the search history buttons
    const searchHistoryButtons = document.querySelectorAll('.search-history-btn');
    searchHistoryButtons.forEach(button => {
        button.addEventListener('click', () => {
        const cityName = button.textContent;
        getWeatherData(cityName);
        });
    });
    }

    // ... Your other functions ...

    // Assuming you have a function to update the search history list
    function updateSearchHistory(cityName) {
    if (!searchHistoryList.includes(cityName)) {
        searchHistoryList.push(cityName);
        displaySearchHistory();
    }
    }

    // ... Your other functions ...

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
        // Process and display current weather and forecast data
        displayCurrentWeather(data);
        displayForecast(data);

        // Update the search history with the new city
        updateSearchHistory(cityName);
        })
        .catch(error => console.error('Error fetching weather data:', error));
    }