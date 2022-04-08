var key = "&appid=38cb9e992aecb85416eb9cc5841da07c";
var locationSearch = document.querySelector("#locationSearch");
var searchedCity = JSON.parse(localStorage.getItem("SearchedCityInfo")) || [];
console.log(searchedCity);
var imageEl = document.querySelector(".image");
var searchHistCon = document.querySelector(".search-btn-container");

// Date details handles
var mainDate = document.querySelector("#mainDate");

getParam();

// Get the search param out of the URL
function getParam() {
  var searchParam = document.location.search.split("&");
  var city = searchParam[0].split("=").pop();
  getLatLon(city);

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
      console.log(cityInfo);
      getWeatherData(cityInfo);
     

      var existingCity = searchedCity.find(({cityName}) => cityName.toLowerCase() === city.toLowerCase());

      if(!existingCity) {
        //pushes city info object into searchedCity array storing locally for access in cityClickHandler function
        searchedCity.unshift(cityInfo);
        localStorage.setItem("SearchedCityInfo", JSON.stringify(searchedCity));
        console.log(searchedCity);
      };

      loadBtn(cityInfo);
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
      loadDateDetails(data);
      console.log(data);
    });
}

// Loads date details
function loadDateDetails(data) {}

//displays search content in button below search form
function loadBtn(cityInfo) {

  var existingCity = searchedCity.find(({cityName}) => cityName.toLowerCase() === cityInfo.cityName.toLowerCase());

      if(!existingCity) {
        //pushes city info object into searchedCity array storing locally for access in cityClickHandler function
        var searchHistBtn = document.createElement("button");
        searchHistBtn.textContent = cityInfo.cityName;
        searchHistCon.prepend(searchHistBtn);
      };

      if(searchHistCon.children.length >= 8) {
        searchHistCon.innerHTML = "";
        loadSearchedCityBtns();
      }
}

//city button click handler pulls cityInfo data from local storage and runs getWeatherData 
function cityClickHandler(event) {
  var city = event.target.textContent;
  cityInfo = searchedCity.find(({cityName}) => cityName === city);
  console.log(cityInfo);
  getWeatherData(cityInfo);
}

function loadSearchedCityBtns() {

  for(var i = 0; i < 8; i++) {

    if (i < searchedCity.length) {
      var searchHistBtn = document.createElement("button");
      var city = searchedCity[i].cityName;
      searchHistBtn.textContent = city;
      searchHistCon.appendChild(searchHistBtn);
    } else {
      return
    };
}
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

//runs function to load buttons with searched cities' names pulled from local storage
loadSearchedCityBtns();

//event listener for clicks on any buttons in the searchHistCon div, runs function to load data for that location pulling lat lon from local storage
searchHistCon.addEventListener("click", cityClickHandler);

