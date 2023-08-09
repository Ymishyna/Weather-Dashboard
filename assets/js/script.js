//html variables
var searchInputEl = document.getElementById("search")
var btnSearchEl = document.getElementById("search-btn")

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
    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid={API key}`

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

