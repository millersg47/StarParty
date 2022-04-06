//initial page load runs function to load photo of the day
pageLoad();

//var declared as img element where fetch API will load the APOD on page load event and will be clicked to load modal with image details
var imageEl = document.querySelector(".image");
//var declared as the location the user inputs
var searchInputEl = document.querySelector(".user-location");
//var declared as the button variable
var searchBtnEl = document.querySelector(".btn");
//var array declared for all elemnts with image-info tag to house the image data pulled from API upon image click
var imageInfo = document.querySelectorAll(".image-info");

//function to pull the nasa APOD API data to load image on page load
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

//function to generate image info on image click. Data is not pulling from fetch in pageLoad function. Need to troubleshoot to fix. 
function imageClickHandler(data) {
  console.log(data);
  var title = data.title;
  var photographer = data.copyright;
  var description = data.explanation;
  var imageData = [];

  imageData.push(title, photographer, description);

  for (var i = 0; i < imageInfo.length; i++) {
    imageInfo[i].innerHTML = imageData[i];
}
}

//function to capture user input as variable and pass to main-page
function searchBtnHandler() {
  event.preventDefault();
  var searchInputVal = searchInputEl.value;
  var queryString = "./main.html?q=" + searchInputVal;

  document.location = queryString;
}

//event listener for clicks on image element
imageEl.addEventListener("click", imageClickHandler);
//event listener for clicks on search button
searchBtnEl.addEventListener("click", searchBtnHandler);
