//html variables
var searchInputEl = document.getElementById("search");
var btnSearchEl = document.getElementById("search-btn");
var currentWeatherEl = document.getElementById("current-weather");
var futureWeatherEl = document.getElementById("future-weather");
var searchHistoryEl = document.getElementById("search-history");

// displaying search history
function displaySearchHistory() {
  var searchHistory = localStorage.getItem("searchHistory");
  if (searchHistory) {
    var cities = JSON.parse(searchHistory);
    searchHistoryEl.innerHTML = "";
    cities.forEach(function (city) {
      var searchItem = document.createElement("p");
      searchItem.textContent = city;
      searchHistoryEl.appendChild(searchItem);
    });
  }
}

// click event listeners for search history items
function addSearchHistoryClickEvent() {
  var searchItems = searchHistoryEl.getElementsByTagName("p");
  for (var i = 0; i < searchItems.length; i++) {
    var searchItem = searchItems[i];
    searchItem.addEventListener("click", function () {
      var cityName = this.textContent;
      getCoordinates(cityName);
    });
  }
}

// saving search history
function saveSearchHistory(city) {
  var searchHistory = localStorage.getItem("searchHistory");
  if (!searchHistory) {
    searchHistory = [];
  } else {
    searchHistory = JSON.parse(searchHistory);
  }

  if (!searchHistory.includes(city)) {
    searchHistory.unshift(city);
    if (searchHistory.length > 5) {
      searchHistory.pop();
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    displaySearchHistory();
    addSearchHistoryClickEvent();
  }
}

// validating input. // purpose is to validate that there is a value in the input box
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

// fetching coordinates of the city
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
      saveSearchHistory(data[0].name);
      getWeather(data[0]);
      currentWeatherEl.classList.remove('d-none');
      futureWeatherEl.classList.remove('d-none');
    })
    .catch(function (error) {
    });
}

// displaying weather data
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

// current weather
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
  heading.style.fontWeight = 'bold ';
  heading.textContent = `${city} (${currentDate})`;
  card.appendChild(heading);
  card.append(cardBody);

  var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  // weather icon
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

// displaying the 5-day forecast
function displayForecast(forecastData) {
  var forecastRow = document.getElementById('forecast-row');
  forecastRow.innerHTML = ''; // clear existing forecast data

  for (var i = 0; i < forecastData.length; i++) {
    var forecast = forecastData[i];
    var forecastColumn = document.createElement('div');
    forecastColumn.className = 'col-md-2';

    var forecastCard = document.createElement('div');
    forecastCard.className = 'card mb-3 bg-dark';

    var forecastCardBody = document.createElement('div');
    forecastCardBody.className = 'card-body text-white';

    var forecastDate = document.createElement('h6');
    forecastDate.className = 'card-title';
    forecastDate.textContent = forecast.date;

    var forecastIcon = document.createElement('img');
    forecastIcon.className = 'weather-icon';
    forecastIcon.src = forecast.icon;
    forecastIcon.alt = forecast.description;

    var forecastTemp = document.createElement('p');
    forecastTemp.className = 'card-text';
    forecastTemp.textContent = `Temp: ${forecast.temp} °C`;

    var forecastWind = document.createElement('p');
    forecastWind.className = 'card-text';
    forecastWind.textContent = `Wind: ${forecast.wind} m/s`;

    var forecastHumidity = document.createElement('p');
    forecastHumidity.className = 'card-text';
    forecastHumidity.textContent = `Humidity: ${forecast.humidity} %`;

    forecastCardBody.appendChild(forecastDate);
    forecastCardBody.appendChild(forecastIcon);
    forecastCardBody.appendChild(forecastTemp);
    forecastCardBody.appendChild(forecastWind);
    forecastCardBody.appendChild(forecastHumidity);

    forecastCard.appendChild(forecastCardBody);
    forecastColumn.appendChild(forecastCard);
    forecastRow.appendChild(forecastColumn);
  }
}

// preparing forecast data for display
function prepareForecastData(forecastList) {
  var forecastData = [];

  for (var i = 0; i < forecastList.length; i += 8) {
    var forecast = forecastList[i];
    var date = forecast.dt_txt.split(' ')[0];
    var icon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    var description = forecast.weather[0].description;
    var temp = forecast.main.temp;
    var wind = forecast.wind.speed;
    var humidity = forecast.main.humidity;

    forecastData.push({
      date: date,
      icon: icon,
      description: description,
      temp: temp,
      wind: wind,
      humidity: humidity,
    });
  }

  return forecastData;
}

// event listener for the button (search) - "click", inputValidate
btnSearchEl.addEventListener('click', inputValidate)

displaySearchHistory(); // call for display search history
addSearchHistoryClickEvent(); // click event listeners to search history items

// initial call to fetch and display weather data when the page loads
getCoordinates(''); // default city