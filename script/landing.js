pageLoad();

//var declared as img element where fetch API will load the APOD on page load event and will be clicked to load modal with image details
var imageEl = document.querySelector(".image");
//var declared as the location the user inputs
var inputEl = document.querySelector(".user-location");

//function to pull the nasa APOD API data to load image and image details on click event
function pageLoad() {
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

//initial page load runs function to load photo of the day
pageLoad();

//var declared as img element where fetch API will load the APOD on page load event and will be clicked to load modal with image details
var imageEl = document.querySelector(".image");
//var declared as the location the user inputs
var searchInputVal = document.querySelector(".user-location").value;
//var declared as the button variable
var searchEl = document.querySelector(".search-button");

var searchInputVal = document.querySelector("#search-input").value;

//function to pull the nasa APOD API data to load image
function pageLoad() {
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

function imageClickHandler(data) {
  var title = data.title;
  var photographer = data.copyright;
  var description = data.explanation;

  var imageModal = document.querySelector("modal");
  var titleEl = document.createElement("h2");
  var grapherEl = document.createElement("h4");
  var descEl = document.createElement("p");

  titleEl.innerHTML = title;
  grapherEl.innerHTML = photographer;
  descEl.innerHTML = description;

  imageModal.append(titleEl, grapherEl, descEl);
}

function searchBtnHandler() {
  var queryString = "./main-page.html?q=" + searchInputVal;

  location.assign(queryString);
}

//event listener for clicks on image element
imageEl.addEventListener("click", imageClickHandler);
searchEl.addEventListener("click", searchBtnHandler);

//event listener for clicks on image element
imageEl.addEventListener("click", imageClickHandler);
