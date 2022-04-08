var key = "&appid=38cb9e992aecb85416eb9cc5841da07c";
var locationSearch = document.querySelector("#locationSearch");
var searchedCity = JSON.parse(localStorage.getItem("SearchedCityInfo")) || [];
console.log(searchedCity);
var imageEl = document.querySelector(".image");
var searchBtn = document.querySelector(".button");
var searchHistCon = document.querySelector(".search-btn-container");

// Get the search param out of the URL
function getParam() {
  var searchParam = document.location.search.split("&");
  var city = searchParam[0].split("=").pop();
  // send city to new function
}

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
      loadBtn(cityInfo);

      //attemping to push city info as a new array item into searchCity array. Needs more work - throwing an error "searchedCity.push" is not a function
      searchedCity.push(cityInfo);
      localStorage.setItem("searchedCityInfo", JSON.stringify(searchedCity));
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

//displays search content in button below search form
function loadBtn(cityInfo) {
  var searchHistBtn = document.createElement("button");

  //creates button to display searched city
  searchHistBtn.textContent = cityInfo.cityName;
  searchHistCon.appendChild(searchHistBtn);
}

//city button click handler. Needs more work - not pulling from the city associated with the click, just pulling from the one set of cityInfo in local storage
function cityClickHandler() {
  var city = event.target.textContent;
  cityInfo = {
    cityName: searchedCity.cityName,
    lat: searchedCity.lat,
    lon: searchedCity.lon,
  };
  getWeatherData(cityInfo);
}

// Takes new location from the user's input and sends it to get latitude and longitude
locationSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityInput = document.querySelector("#cityInput");
  var city = cityInput.value;
  getLatLon(city);
});

//loads Nasa APOD from fetch into image element
function loadApodImg() {
  var nasaApiKey = "rjXci6T4vcKLOB8bqde7f6P7zntlo9i8TFoYiiML";
  // fetch request gets photo and details for current date's pod
  var requestUrl = "https://api.nasa.gov/planetary/apod?api_key=" + nasaApiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //logs the data as an object
      console.log(data);
      //declares var for url of pod
      var imageUrl = data.url;
      //updates the image src attribute with url for pod
      imageEl.src = imageUrl;
    });
}

//redirects to Nasa APOD website on image click
imageEl.addEventListener("click", function (event) {
  event.preventDefault();
  imageEl;
  document.location = "https://apod.nasa.gov/apod/astropix.html";
});

//runs APOD load function
loadApodImg();

searchBtn.addEventListener("click", getLatLon);
searchHistCon.addEventListener("click", cityClickHandler);
