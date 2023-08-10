//html variables
var searchInputEl = document.getElementById("search");
var btnSearchEl = document.getElementById("search-btn");
var currentWeatherEl = document.getElementById("current-weather");
var futureWeatherEl = document.getElementById("future-weather");


//create an event listener for the button (search) --- "click", inputValidate
btnSearchEl.addEventListener('click', inputValidate)
//function inputValidate -- purpose is to validate that there is a value in the input box

function inputValidate(e) {
 if(!searchInputEl.value){
    alert("Please type the name of the city you are looking for");
    return;
 }
 e.preventDefault()
    var search = searchInputEl.value.trim();
 getCoordinates(search)
 searchInputEl.value = '';
}

//vaidated input of name of a city/location, next function is to get the geo coordinates api
function getCoordinates(search) {
    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=82b45b8d50fb832bca393df388f7502c`

    fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[0])

      getWeather(data[0])
      }
    );
}

function getWeather(location) {

  var {lat, lon } = location
  
  var city = location.name
  
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=82b45b8d50fb832bca393df388f7502c`
  
  //pulling the weather 
      fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
       //look at the data, determin what you need to solve - current and forecast
       //call out each function , or I could use a function to share the info
       shareData(data.list, city)
      });
      
  }
  
  function shareData(weather, city) {
      displayCurrent(weather[0])
      displayForecast()
      
  }

  