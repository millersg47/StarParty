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
          console.log(data)
          //declares var for url of pod
          var imageUrl = data.url;
          //updates the image src attribute with url for pod
          imageEl.src = imageUrl;
      });
  }

pageLoad();

//event listener for clicks on image element
imageEl.addEventListener("click", imageClickHandler);