//img element where fetch API will load the APOD on page load event
var imageEl = document.querySelector(".image");

//function to pull the nasa APOD API data to load image and image details on click event
function getNasaApi() {

    var nasaApiKey = "rjXci6T4vcKLOB8bqde7f6P7zntlo9i8TFoYiiML";
      // fetch request gets photo and photo details by date
      var requestUrl = "https://api.nasa.gov/planetary/apod?api_key=" + nasaApiKey;
    
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //logs the array of objects within 'data'
          console.log(data)
      });
  }