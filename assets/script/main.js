var key = "&appid=38cb9e992aecb85416eb9cc5841da07c";
var locationSearch = document.querySelector("#locationSearch");
var searchedCity = JSON.parse(localStorage.getItem("SearchedCityInfo")) || [];
var imageEl = document.querySelector(".image");
var searchHistCon = document.querySelector(".search-btn-container");

// Date details handles
var mainDate = document.querySelector("#mainDate");
var mainIcon = document.querySelector("#mainIcon");
var mainClouds = document.querySelector("#mainClouds");
var mainTemp = document.querySelector("#mainTemp");
var mainSunset = document.querySelector("#mainSunset");
var mainSunrise = document.querySelector("#mainSunrise");
var mainMoonPhase = document.querySelector("#mainMoonPhase");
var mainPlanets = document.querySelector("#mainPlanets");

getParam();

// Get the search param out of the URL
function getParam() {
  var searchParam = document.location.search.split("&");
  var city = searchParam[0].split("=").pop().replace("%20", " ");
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
      getWeatherData(cityInfo);
      getVisPlanets(cityInfo);

      var existingCity = searchedCity.find(
        ({ cityName }) => cityName.toLowerCase() === city.toLowerCase()
      );

      if (!existingCity) {
        //pushes city info object into searchedCity array storing locally for access in cityClickHandler function
        searchedCity.unshift(cityInfo);
        localStorage.setItem("SearchedCityInfo", JSON.stringify(searchedCity));
      }

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
      loadWeatherDetails(data);
    });
}

// Fetches data on visible planets based on location selected by user
function getVisPlanets(cityInfo) {
  var requestPlanetsUrl = `https://visible-planets-api.herokuapp.com/v2?latitude=${cityInfo.lat}&longitude=${cityInfo.lon}`;

  fetch(requestPlanetsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      loadPlanetDetails(data);
    });
}

// Loads main day details
function loadWeatherDetails(data) {
  console.log(data);
  mainDate.textContent = requestDay(0);
  mainIcon.setAttribute("src", requestIcon(data.current.weather[0].icon));
  mainClouds.textContent = `${data.current.clouds}%`;
  mainTemp.textContent = `${data.current.temp}\xB0F`;

  // moonphase
  var moon = data.daily[0].moon_phase - 0.03;
  if (moon === 1 || moon === 0) {
    mainMoonPhase.textContent = "new moon";
  } else if (moon > 0 && moon < 0.25) {
    mainMoonPhase.textContent = "waxing crescent";
  } else if (moon > 0.25 && moon < 0.5) {
    mainMoonPhase.textContent = "waxing gibous";
  } else if (moon > 0.4 && moon < 0.6) {
    mainMoonPhase.textContent = "full moon";
  } else if (moon > 0.5 && moon < 0.75) {
    mainMoonPhase.textContent = "waning gibous";
  } else if (moon > 0.75 && moon < 1) {
    mainMoonPhase.textContent = "waning crescent";
  }

  // add unix timestamp function for sunset and sunrise
}

// Loads visible object details
function loadPlanetDetails(data) {
  var visibleObjects = data.data;

  for (let i = 0; i < visibleObjects.length; i++) {
    var objectListItem = document.createElement("li");
    objectListItem.textContent = visibleObjects[i].name;
    if (visibleObjects[i].name == 'Venus') {
        objectListItem.innerHTML += '<img class="planetIcon" src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-venus-space-prettycons-lineal-color-prettycons.png"/>'
    } else if (visibleObjects[i].name == 'Mars') {
      objectListItem.innerHTML += '<img class="planetIcon" src="https://img.icons8.com/external-tulpahn-flat-tulpahn/64/000000/external-mars-space-tulpahn-flat-tulpahn.png"/>'
    } else if (visibleObjects[i].name == 'Mercury') {
      objectListItem.innerHTML += '<img class="planetIcon" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-mercury-astrology-flaticons-lineal-color-flat-icons.png"/>'
    } else if (visibleObjects[i].name == 'Jupiter') {
      objectListItem.innerHTML += '<img class="planetIcon" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-jupiter-space-wanicon-lineal-color-wanicon.png"/>'
    } else if (visibleObjects[i].name == 'Uranus') {
      objectListItem.innerHTML += '<img class="planetIcon" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-uranus-astrology-flaticons-lineal-color-flat-icons.png"/>'
    } else if (visibleObjects[i].name == 'Neptune') {
      objectListItem.innerHTML += '<img class="planetIcon" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-neptune-astrology-flaticons-lineal-color-flat-icons.png"/>'
    } else if (visibleObjects[i].name == 'Saturn') {
      objectListItem.innerHTML += '<img class="planetIcon" src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-saturn-elearning-and-education-justicon-flat-justicon.png"/>' 
    }
    mainPlanets.appendChild(objectListItem);
  } 
}

//displays search content in button below search form
function loadBtn(cityInfo) {
  var existingCity = searchedCity.find(
    ({ cityName }) => cityName.toLowerCase() === cityInfo.cityName.toLowerCase()
  );

  if (!existingCity) {
    //pushes city info object into searchedCity array storing locally for access in cityClickHandler function
    var searchHistBtn = document.createElement("button");
    searchHistBtn.textContent = cityInfo.cityName;
    searchHistCon.prepend(searchHistBtn);
  }

  if (searchHistCon.children.length >= 8) {
    searchHistCon.innerHTML = "";
    loadSearchedCityBtns();
  }
}

//city button click handler pulls cityInfo data from local storage and runs getWeatherData
function cityClickHandler(event) {
  var city = event.target.textContent;
  cityInfo = searchedCity.find(({ cityName }) => cityName === city);
  console.log(cityInfo);
  getWeatherData(cityInfo);
}

function loadSearchedCityBtns() {
  for (var i = 0; i < 8; i++) {
    if (i < searchedCity.length) {
      var searchHistBtn = document.createElement("button");
      var city = searchedCity[i].cityName;
      searchHistBtn.textContent = city;
      searchHistCon.appendChild(searchHistBtn);
    } else {
      return;
    }
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

// Returns requested day
function requestDay(i) {
  var today = new Date();
  var date = new Date();
  date.setDate(today.getDate() + i);

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var fullDate = `${month}/${day}/${year}`;

  return fullDate;
}

// Returns weather icon src
function requestIcon(icon) {
  var url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return url;
}

//runs APOD load function
loadApodImg();

//runs function to load buttons with searched cities' names pulled from local storage
loadSearchedCityBtns();

//event listener for clicks on any buttons in the searchHistCon div, runs function to load data for that location pulling lat lon from local storage
searchHistCon.addEventListener("click", cityClickHandler);
