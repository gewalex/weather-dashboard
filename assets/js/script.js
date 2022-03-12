
var cityFormEl = document.querySelector('#city-form');
var nameInputEl = document.querySelector('#cityname');
var weatherDataContainerEl = document.querySelector('#weather-data-container');
var weatherDataSearchTerm = document.querySelector('#weather-data-search');
var city;
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
          displayCurrentWeatherData(data, city);
          //object return for current weather
          var latitudeValue = data['coord']['lat'];
          var longitudeValue = data['coord']['lon'] ;
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
           // console.log("response:"+ response.json());
            return response.json().then(function(data) {
             // console.log("data:"+data);
              console.log(data); 
              displayFuturetWeatherData(data, city);
            });

          } 
          // else {
          //   alert('Error: City name Not Found');
          // }

        })
      };


var displayCurrentWeatherData = function(weatherData, searchTerm) {
  //check if api returned any weather data
  if (weatherData === 0) {
    weatherDataContainerEl.textContent = 'No weater data found.';
    return;
  }

  weatherDataSearchTerm.textContent = searchTerm;
    // object returned from api for current weather
    var temperatureValue = weatherData['main']['temp'];
    var humidityValue= weatherData['main']['humidity'];
    var speedValue = weatherData['wind']['speed'];
    var timeInSecondValue = weatherData['dt'];
    var dateValue = moment(timeInSecondValue).format("L");
    // "<div>"+ date + "</div>" 
    // array of objects returned from api for 5 days after current day 

   // var latitudeValue =  weatherData['coord']['lat'];
   //var longitudeValue = weatherData['coord']['lon'] ;
    //array object returned

    //CITY AN DATE
    var icon =  weatherData['weather'][0]['icon'];
    //display current weather info as div block element
    var currentWeatherInfo =  "<div>"+ dateValue + "</div>"+" <div> Temperature: " + temperatureValue +"&#8457;" + "</div>"  
                  + "<div> Wind Speed: " + speedValue + " MPH" + "</div>"
                  + "<div> Humidity: " + humidityValue + " %" + "</div>";
   
    // create a container for weather data
    var weatherDataEl = document.createElement('div');

    weatherDataEl.classList = 'list-item flex-row justify-space-between align-center';
    // create a span element to hold City name
    var titleEl = document.createElement('span');
    
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


  var displayFuturetWeatherData = function(weatherData, searchTerm) {
  //check if api returned any weather data
  if (weatherData.length === 0) {
    weatherDataContainerEl.textContent = 'No weater data found.';
    return;
  }
  weatherDataSearchTerm.textContent = searchTerm;
  // loop over weather data
  for (var i = 0; i < weatherData.length; i++) {
    // format repo name

    var temperatureVal = weatherData[i].temp;
    var humidityVal= weatherData[i].humidity;
    var speedVal = weatherData[i].wind_speed;
    var timeInSecondVal = weatherData[i].dt;
    var iconVal =  weatherData.weather[i].icon;

    var dateVal = moment(timeInSecondVal).format("L");

    //display current weather info as div block element
    var futureWeatherInfo =  "<div>"+ dateVal + "</div>"+" <div> Temperature: " + temperatureVal +"&#8457;" + "</div>"  
                  + "<div> Wind Speed: " + speedVal + " MPH" + "</div>"
                  + "<div> Humidity: " + humidityVal + " %" + "</div>";
   
    // create a container for weather data
    var weatherDataEl = document.createElement('div');

    weatherDataEl.classList = 'list-item flex-row justify-space-between align-center';
    // create a span element to hold City name
    var titleEl = document.createElement('span');
    
    titleEl.innerHTML = futureWeatherInfo;
    // append to container
    weatherDataEl.appendChild(titleEl);

   
    // create a status element
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';
    
      let imgIconVal = document.createElement('img'); 
      imgIconVal.setAttribute('src', `https://openweathermap.org/img/wn/${iconVal}@2x.png`)
  
      statusEl.appendChild(imgIconVal); 

    // append to container
    weatherDataEl.appendChild(statusEl);

    // append container to the dom
    weatherDataContainerEl.appendChild(weatherDataEl);
  }
};

// add event listeners to forms
cityFormEl.addEventListener('submit', formSubmitHandler);

    