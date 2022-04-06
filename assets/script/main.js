var key = "&appid=38cb9e992aecb85416eb9cc5841da07c";
var locationSearch = document.querySelector("#locationSearch");

// Returns longitude and latitude from city input
function getLatLon(city) {
  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}${key}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Assigns city information to an object
      cityInfo = { cityName: city, lat: data[0].lat, lon: data[0].lon };
      getWeatherData(cityInfo);
    });
}

// Returns weather data from latitude and longitude
function getWeatherData(cityInfo) {
  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityInfo.lat}&lon=${cityInfo.lon}&units=imperial${key}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

// Takes new location from the user's input and sends it to get latitude and longitude
locationSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityInput = document.querySelector("#cityInput");
  var city = cityInput.value;
  getLatLon(city);
});
