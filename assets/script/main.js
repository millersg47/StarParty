var key = "&appid=38cb9e992aecb85416eb9cc5841da07c";
var locationSearch = document.querySelector("#locationSearch");
var searchedCity = JSON.parse(localStorage.getItem("SearchedCityInfo")) || [];
var imageEl = document.querySelector(".image");
var searchHistCon = document.querySelector(".search-btn-container");
var modalContainer = document.querySelector(".modal");
var modalCloseBtn = document.querySelector(".modal-close");

// Date details handles
var mainDate = document.querySelector("#mainDate");
var mainIcon = document.querySelector("#mainIcon");
var mainClouds = document.querySelector("#mainClouds");
var mainTemp = document.querySelector("#mainTemp");
var mainSunset = document.querySelector("#mainSunset");
var mainSunrise = document.querySelector("#mainSunrise");
var mainMoonPhase = document.querySelector("#mainMoonPhase");
var mainPlanets = document.querySelector("#mainPlanets");

//forecast content variables
var forecastCardArr = document.querySelectorAll(".cards");
var forecastDate = document.querySelectorAll(".date-content");
var moonPhase = document.querySelectorAll(".moon-content");
console.log(moonPhase);
var sunset = document.querySelectorAll(".sunset-content");
var weatherIcon = document.querySelectorAll(".forecast-icon");
var desc = document.querySelectorAll(".desc-content");

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
      //checks for valid input, if not valid loads modal
      if (!data.length) {
        console.log("No results found!");
        modalContainer.classList.add("is-active");
        return;
      // if input is valid, city Info is created and the rest of the function runs
      } else {
        // Assigns city information to an object
        cityInfo = { cityName: city, lat: data[0].lat, lon: data[0].lon };

        var existingCity = searchedCity.find(
          ({ cityName }) => cityName.toLowerCase() === city.toLowerCase()
        );

        if (!existingCity) {
          //pushes city info object into searchedCity array storing locally for access in cityClickHandler function
          searchedCity.unshift(cityInfo);
          localStorage.setItem("SearchedCityInfo", JSON.stringify(searchedCity));
          // use DOM to remove all existing buttons
          // removeButtonsFromDom();
          removeBtns();
          // use DOM to replace buttons with new localStorage values
          loadSearchedCityBtns();
        }
        getWeatherData(cityInfo);
        getVisPlanets(cityInfo);
      };
  });
}

//removes modal on click
modalCloseBtn.addEventListener("click", function() {
  modalContainer.classList.remove("is-active");
})


//removes search history buttons from DOM
function removeBtns() {
  while (searchHistCon.lastElementChild) {
    searchHistCon.removeChild(searchHistCon.lastElementChild);
  }
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
      loadForecastDetails(data);
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

  // moonphase for main card
  var moon = data.daily[0].moon_phase - 0.03;
  addMoonText (moon, mainMoonPhase)
  // add unix timestamp function for sunset and sunrise
}

function addMoonText (moon, mainMoonPhase) {
  if (moon === 1 || moon === 0) {
    mainMoonPhase.textContent = "new moon";
    mainMoonPhase.innerHTML +=
      '<img class="moonPic" src="https://img.icons8.com/emoji/48/000000/new-moon-emoji.png"/>';
  } else if (moon > 0 && moon < 0.25) {
    mainMoonPhase.textContent = "waxing crescent";
    mainMoonPhase.innerHTML +=
      '<img class="moonPic" src="https://img.icons8.com/emoji/48/000000/waxing-crescent-moon.png"/>';
  } else if (moon >= 0.25 && moon < 0.5) {
    mainMoonPhase.textContent = "waxing gibous";
    mainMoonPhase.innerHTML +=
      '<img class="moonPic" src="https://img.icons8.com/emoji/48/000000/waxing-gibbous-moon.png"/>';
  } else if (moon > 0.4 && moon < 0.6) {
    mainMoonPhase.textContent = "full moon";
    mainMoonPhase.innerHTML +=
      '<img class="moonPic" src="https://img.icons8.com/color/48/000000/full-moon.png"/>';
  } else if (moon > 0.5 && moon < 0.75) {
    mainMoonPhase.textContent = "waning gibous";
    mainMoonPhase.innerHTML +=
      '<img class="moonPic" src="https://img.icons8.com/emoji/48/000000/waning-gibbous-moon.png"/>';
  } else if (moon >= 0.75 && moon < 1) {
    mainMoonPhase.textContent = "waning crescent";
    mainMoonPhase.innerHTML +=
      '<img class="moonPic" src="https://img.icons8.com/emoji/48/000000/waning-crescent-moon.png"/>';
  }
}

// Loads visible object details
function loadPlanetDetails(data) {
  var visibleObjects = data.data;
  mainPlanets.innerHTML = "";
  for (let i = 0; i < visibleObjects.length; i++) {
    var objectListItem = document.createElement("li");
    objectListItem.textContent = visibleObjects[i].name;
    if (visibleObjects[i].name == "Venus") {
      objectListItem.innerHTML +=
        '<img class="planetIcon" src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-venus-space-prettycons-lineal-color-prettycons.png"/>';
    } else if (visibleObjects[i].name == "Mars") {
      objectListItem.innerHTML +=
        '<img class="planetIcon" src="https://img.icons8.com/external-tulpahn-flat-tulpahn/64/000000/external-mars-space-tulpahn-flat-tulpahn.png"/>';
    } else if (visibleObjects[i].name == "Mercury") {
      objectListItem.innerHTML +=
        '<img class="planetIcon" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-mercury-astrology-flaticons-lineal-color-flat-icons.png"/>';
    } else if (visibleObjects[i].name == "Jupiter") {
      objectListItem.innerHTML +=
        '<img class="planetIcon" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-jupiter-space-wanicon-lineal-color-wanicon.png"/>';
    } else if (visibleObjects[i].name == "Uranus") {
      objectListItem.innerHTML +=
        '<img class="planetIcon" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-uranus-astrology-flaticons-lineal-color-flat-icons.png"/>';
    } else if (visibleObjects[i].name == "Neptune") {
      objectListItem.innerHTML +=
        '<img class="planetIcon" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-neptune-astrology-flaticons-lineal-color-flat-icons.png"/>';
    } else if (visibleObjects[i].name == "Saturn") {
      objectListItem.innerHTML +=
        '<img class="planetIcon" src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-saturn-elearning-and-education-justicon-flat-justicon.png"/>';
    } else if (visibleObjects[i].name == "Moon") {
      objectListItem.innerHTML +=
        '<img class="planetIcon" src="https://img.icons8.com/color/48/000000/full-moon.png"/>';
    }
    mainPlanets.appendChild(objectListItem);
  }
}

//loads five day forecast details into cards
function loadForecastDetails(data) {
  console.log(data);
  for (var i = 0; i < forecastCardArr.length; i++) {
    var forecastIconData = data.daily[i + 1].weather[0].icon;
    var today = requestDay(i + 1);

    forecastDate[i].textContent = today;
    sunset[i].textContent = data.daily[i + 1].sunset;
    weatherIcon[i].src =
      "https://openweathermap.org/img/wn/" + forecastIconData + "@2x.png";
    desc[i].textContent = data.daily[i + 1].weather[0].description;

//adds the same moon icons to the cards from addMoonText function from above
    var moon = data.daily[i].moon_phase - 0.03;
    console.log(moon);
    addMoonText(moon, moonPhase[i]) //calls it here
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

      if(data.media_type === "video") {
        imageEl.src = " https://apod.nasa.gov/apod/image/2201/CarinaNorth_Colombari_960.jpg";
      //event listener for clicks on image element
      } else {
        //declares var for url of pod
        var imageUrl = data.url;
        //updates the image src attribute with url for pod
        imageEl.src = imageUrl;
        };
  });
}

//redirects to Nasa APOD website on image click
imageEl.addEventListener("click", function (event) {
  event.preventDefault();
  imageEl;
  window.open("https://apod.nasa.gov/apod/astropix.html");
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

// Returns time from unix format
function unixTimeReformat(unixTimestamp) {
  var d = new Date(unixTimestamp * 1000);
  var hour;
  var minutes;
  var time;

  if (d.getMinutes() < 10) {
    minutes = `0${d.getMinutes()}`;
  } else {
    minutes = d.getMinutes();
  }

  if (d.getHours() > 12) {
    hour = d.getHours() - 12;
    time = `${hour}:${minutes} PM`;
  } else {
    hour = d.getHours();
    time = `${hour}:${minutes} AM`;
  }

  return time;
}

//runs APOD load function
loadApodImg();

//runs function to load buttons with searched cities' names pulled from local storage
loadSearchedCityBtns();

//event listener for clicks on any buttons in the searchHistCon div, runs function to load data for that location pulling lat lon from local storage
searchHistCon.addEventListener("click", cityClickHandler);
