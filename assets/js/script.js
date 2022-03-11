
var cityFormEl = document.querySelector('#city-form');
var nameInputEl = document.querySelector('#cityname');
var weatherDataContainerEl = document.querySelector('#weather-data-container');
var weatherDataSearchTerm = document.querySelector('#weather-data-search');

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityname = nameInputEl.value.trim();

  if (cityname) {
    getCityNameWeatherData(cityname);
    
    // clear old content
    weatherDataContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a valid city name');
  }
};

var getCityNameWeatherData = function(city) {
  // format the api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=43307f36c133c1b4d80feb3644b2ab3e&units=imperial";

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        return response.json().then(function(data) {
          console.log(data); 
          displayRepos(data, city);
          //object return for current weather
          var latitudeValue = data['coord']['lon'];
          var longitudeValue = data['coord']['lat'] ;
          console.log("latitudeValue:"+latitudeValue, "longitudeValue:"+longitudeValue);

          getLatitudeAndLongitude(latitudeValue, longitudeValue); 

        });
        //
      } else {
        alert('Error: City Not Found');
      }
    //
    })
    .catch(function(error) {
      alert('Unable to connect to openweathermap');
    });
};

var getLatitudeAndLongitude = function(latitudeValue, longitudeValue){
  var apiUrlOnecall="https://api.openweathermap.org/data/2.5/onecall?lat=" +latitudeValue+"&lon=" +longitudeValue+ "&appid=43307f36c133c1b4d80feb3644b2ab3e&units=imperial";
          fetch(apiUrlOnecall)
        .then(function(response) {
          // request was successful
          if (response.ok) {
            console.log("response:"+ response.json());
            return response.json().then(function(data) {
              console.log("data:"+data); 
              //displayRepos(data, user);
            });

          } 
          // else {
          //   alert('Error: City name Not Found');
          // }

        })
      };


var displayRepos = function(weatherData, searchTerm) {
  //check if api returned any weather data
  if (weatherData === 0) {
    weatherDataContainerEl.textContent = 'No repositories found.';
    return;
  }

  weatherDataSearchTerm.textContent = searchTerm;
    // object returned from api for current weather
    var temperatureValue = weatherData['main']['temp'];
    var humidityValue= weatherData['main']['humidity'];
    var speedValue = weatherData['wind']['speed'];

   // var latitudeValue =  weatherData['coord']['lon'];
   //var longitudeValue = weatherData['coord']['lat'] ;
    //array object returned
    var icon =  weatherData['weather'][0]['icon'];
    //display current weather info as div block element
    var currentWeatherInfo = " <div> Temperature: " + temperatureValue +"&#8457;" + "</div>"  
                  + "<div> Wind Speed: " + speedValue + " MPH" + "</div>"
                  + "<div> Humidity: " + humidityValue + " %" + "</div>";
   
    // create a container for weather data
    var weatherDataEl = document.createElement('div');

    weatherDataEl.classList = 'list-item flex-row justify-space-between align-center';
    // create a span element to hold repository name
    var titleEl = document.createElement('span');
    //titleEl.textContent = repoNameTemp;
    titleEl.innerHTML = currentWeatherInfo;
    // append to container
    weatherDataEl.appendChild(titleEl);

   
    // create a status element
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';
    
      let imgIcon = document.createElement('img'); 
      imgIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)
  
      statusEl.appendChild(imgIcon); 

    // append to container
    weatherDataEl.appendChild(statusEl);

    // append container to the dom
    weatherDataContainerEl.appendChild(weatherDataEl);
  };


// add event listeners to forms
cityFormEl.addEventListener('submit', formSubmitHandler);

    