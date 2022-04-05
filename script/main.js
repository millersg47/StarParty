var key = "&appid=38cb9e992aecb85416eb9cc5841da07c";

// Returns longitude and latitude from city input
function getLatLon(city) {
  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}${APIKey}`;
  var cityInfo = { cityName: city, lat: "", lon: "" };

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Checks to see if user's city input was valid
      cityInfo.lat = data[0].lat;
      cityInfo.lon = data[0].lon;
    });
}
