var key = "&appid=38cb9e992aecb85416eb9cc5841da07c";

// Returns longitude and latitude from city input
function getLatLon(city) {
  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}${APIKey}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Assigns city information to an object
      cityInfo = { cityName: city, lat: data[0].lat, lon: data[0].lon };
    });
}
