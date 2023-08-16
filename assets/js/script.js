//html variables
var searchInputEl = document.getElementById("search");
var btnSearchEl = document.getElementById("search-btn");
var currentWeatherEl = document.getElementById("current-weather");
var futureWeatherEl = document.getElementById("future-weather");
var searchHistoryEl = document.getElementById("search-history");


// Function to validate input
function inputValidate(e) {
  e.preventDefault();

  var searchValue = searchInputEl.value.trim();

  if (searchValue === "") {
    alert("Please type the name of the city you are looking for");
    return;
  }

  getCoordinates(searchValue);
  searchInputEl.value = "";
}

// Function to fetch coordinates of the city
function getCoordinates(search) {
  var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=82b45b8d50fb832bca393df388f7502c`;

  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length === 0) {
        console.error("City not found.");
        return;
      }
      saveSearchHistory(data[0].name); // Save search history
      getWeather(data[0]); // Move this line here
      currentWeatherEl.classList.remove('d-none');
      futureWeatherEl.classList.remove('d-none');
    })
    .catch(function (error) {

    });
}


// Function to get and display weather data
function getWeather(location) {
  var { lat, lon } = location;
  var city = location.name;

  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=82b45b8d50fb832bca393df388f7502c&units=metric`;

  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayCurrent(data.list[0], city);
      displayForecast(prepareForecastData(data.list.slice(1)));
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

function displayCurrent(weather, city) {
  var temp = weather.main.temp;
  var windSpeed = weather.wind.speed;
  var humidity = weather.main.humidity;
  var currentDate = new Date().toLocaleDateString();

  var currentContainer = document.getElementById('current-weather');
  currentContainer.innerHTML = '';

  var card = document.createElement('div');
  card.setAttribute('class', 'card mt-3');
  var cardBody = document.createElement('div');
  cardBody.setAttribute('class', 'card-body');

  var heading = document.createElement('h4');
  heading.setAttribute('class', 'card-title pt-2');
  heading.style.fontWeight = 'bold '; // Apply inline style for bold text
  heading.textContent = `${city} (${currentDate})`;
  card.appendChild(heading);
  card.append(cardBody);


  var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  // Add weather icon
  var iconImg = document.createElement('img');
  iconImg.setAttribute('src', icon);
  iconImg.setAttribute('alt', 'Weather Icon');
  cardBody.appendChild(iconImg);


  var tempEl = document.createElement('p');
  tempEl.setAttribute('class', 'card-text');
  tempEl.textContent = `Temperature: ${temp} °C`;
  cardBody.appendChild(tempEl);

  var windEl = document.createElement('p');
  windEl.setAttribute('class', 'card-text');
  windEl.textContent = `Wind Speed: ${windSpeed} m/s`;
  cardBody.appendChild(windEl);

  var humidityEl = document.createElement('p');
  humidityEl.setAttribute('class', 'card-text');
  humidityEl.textContent = `Humidity: ${humidity}%`;
  cardBody.appendChild(humidityEl);

  currentContainer.appendChild(card);
}

