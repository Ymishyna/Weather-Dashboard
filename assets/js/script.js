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
      console.log(data);
      console.log(data[0])

      getWeather(data[0])
      }
    );
}

function getWeather(location) {

  var {lat, lon } = location
  
  var city = location.name
  
  var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=82b45b8d50fb832bca393df388f7502c&units=metric`
  
  //pulling the weather 
      fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data); //pulling from line 52
       //look at the data, determin what you need to solve - current and forecast
       //call out each function , or I could use a function to share the info
      //  shareData(data.list, city)
      displayCurrent(data.list[0], city);
      //calling funtion dataForecast. dataForecast(data.list)
      });
      
  }
  
  function displayCurrent(weather, city) {
    console.log(weather);
    console.log(city);
  
    //I can start oulling my data
    //creating vars for data
    var temp = weather.main.temp;
    var windspeed = weather.wind.speed;
    var humid = weather.main.humidity;
    // var iconDescr = weather.weather[0].description;
    // var icon = weather.weather[0].icon; 
    // console.log(temp, windspeed, humid, iconDescr, icon);
    var currentContainer = document.getElementById('current-weather'); 
    //we need city name, date, icon
    //create a card to display
    var card = document.createElement('div');
    card.setAttribute('class', 'card');
    var cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body'); //title and image
    

    var heading = document.createElement('h5');
    heading.setAttribute('class', 'card-title');
    heading.textContent = city;
    card.appendChild(heading);
    card.append(cardBody);

    //display weather
    var tempEl = document.createElement('p');
    tempEl.setAttribute('class', 'card-text');
    tempEl.textContent = `temp: ${temp}`;

    cardBody.appendChild(tempEl);

    
    currentContainer.append(card);
  }



  