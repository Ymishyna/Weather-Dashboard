# Weather-Dashboard

## Description

I am building a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS. I will be using third-party APIs that will allow me to access the data and functionality by making requests with specific parameters to a URL. I will be retrieving data from another application's API and using it in the context of this application.

I am using [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. The base URL will look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`. 

I will use `localStorage` to store any persistent data. 

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](./assets/images/weather-dashboard-demo.png)


Deployed Site Link:



GitHub Link:
