//initial page load runs function to load photo of the day
pageLoad();

//var declared as img element where fetch API will load the APOD on page load event and will be clicked to load modal with image details
var imageEl = document.querySelector(".image");
//var declared as the location the user inputs
var searchInputEl = document.querySelector(".user-location");
//var declared as the button variable
var searchBtnEl = document.querySelector(".btn");
//var array declared for all elemnts with image-info tag to house the image data pulled from API upon image click
var imageInfo = document.querySelector("#imageModal");

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
      console.log(data);

      if(data.media_type === "video") {
        imageEl.src = " https://apod.nasa.gov/apod/image/2201/CarinaNorth_Colombari_960.jpg";
      //event listener for clicks on image element
        imageEl.addEventListener("click", function () {
          imageAltClickHandler(data);
        });
      } else {
        //declares var for url of pod
        var imageUrl = data.url;
        //updates the image src attribute with url for pod
        imageEl.src = imageUrl;
        //event listener for clicks on image element
        imageEl.addEventListener("click", function () {
          imageClickHandler(data);
        });
    };
  });
}

//function to load video replacement image data below image
function imageAltClickHandler(data) {
  imageInfo.innerHTML = "";
    var titleEl = document.createElement("h2");
    titleEl.textContent = "Carina Nebula North";

    var photographerEl = document.createElement("h4");
    photographerEl.textContent = "Roberto Colombari";

    var descriptionEl = document.createElement("p");
    descriptionEl.textContent = "The Great Carina Nebula is home to strange stars and iconic nebulas. Named for its home constellation, the huge star-forming region is larger and brighter than the Great Orion Nebula but less well known because it is so far south -- and because so much of humanity lives so far north. The featured image shows in great detail the northern-most part of the Carina Nebula. Visible nebulas include the semi-circular filaments surrounding the active star Wolf-Rayet 23 (WR23) on the far left. Just left of center is the Gabriela Mistral Nebula consisting of an emission nebula of glowing gas (IC 2599) surrounding the small open cluster of stars (NGC 3324). Above the image center is the larger star cluster NGC 3293, while to its right is the relatively faint emission nebula designated Loden 153. The most famous occupant of the Carina Nebula, however, is not shown. Off the image to the lower right is the bright, erratic, and doomed star star known as Eta Carinae -- a star once one of the brightest stars in the sky and now predicted to explode in a supernova sometime in the next few million years.";

    imageInfo.appendChild(titleEl);
    imageInfo.appendChild(photographerEl);
    imageInfo.appendChild(descriptionEl);
}

//function to generate image info on image click.
function imageClickHandler(data) {
  imageInfo.innerHTML = "";
  var title = data.title;
  var photographer = data.copyright;
  var description = data.explanation;

  if (!photographer) {
    var titleEl = document.createElement("h2");
    titleEl.textContent = title;

    var descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;

    imageInfo.appendChild(titleEl);
    imageInfo.appendChild(descriptionEl);
  } else {
    var titleEl = document.createElement("h2");
    titleEl.textContent = title;

    var photographerEl = document.createElement("h4");
    photographerEl.textContent = photographer;

    var descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;

    imageInfo.appendChild(titleEl);
    imageInfo.appendChild(photographerEl);
    imageInfo.appendChild(descriptionEl);
  }
}

//function to capture user input as variable and pass to main-page
function searchBtnHandler(event) {
  event.preventDefault();
  var searchInputVal = searchInputEl.value;
  var queryString = "./main.html?q=" + searchInputVal;

  document.location = queryString;
}

//event listener for clicks on search button
searchBtnEl.addEventListener("click", searchBtnHandler);
