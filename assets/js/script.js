//html variables
var searchInputEl = document.getElementById("search")
var btnSearchEl = document.getElementById("search-btn")

//create an event listener for the button (search) --- "click", inputValidate
btnSearchEl.addEventListener('click', inputValidate)
//function inputValidate -- purpose is to validate that there is a value in the input box

function inputValidate(e) {
 if(!searchInputEl.value){
    return;
 }
 e.preventDefault()
    var search = searchInputEl.value.trim();
 getCoordinates(search)
 searchInputEl.value = '';
}

