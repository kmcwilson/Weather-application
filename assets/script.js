//Assigning these global variables so that they can be cleared upon new searches by the user
const searchBtn = document.getElementById('search-btn');
let cities = JSON.parse(localStorage.getItem('cities')) || [];
let cityInput = document.querySelector('.input-city');
const currentCity = document.getElementById('current-city');
const fiveDays = document.getElementById('long-forecast');
const apiKey = '924b7419ff70c0bc92431d764dab8a64';
let cityDisplay = document.getElementById('city-header');
let cityName = cityInput.value.trim();


//Using the openweathermap to find the latitude and longitude to get the forecast and using the input of city name 

function getCoordinates(cityName) {
    const requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
    fetch(requestUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let lat = data[0].lat;
            let lon = data[0].lon;
            searchWeather(lat, lon);
        })
};

//Using the latitude and longitude passed from the first api call in order to get the weather for the city entered by the user

function searchWeather(lat, lon) {
    let secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(secondUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.list);
            displayWeather(data.list);
        })

};

//The function of display weather is going through the array from the searchweather function and getting it to display on the current weather block

function displayWeather(data) {

    const currentDayList = document.createElement('li');
    const weatherImg = document.createElement('img');
    //These variables are going to go through the links to find the open weather icon to display
    const weatherIcon = data[0].weather[0].icon;
    weatherImg.classList.add('weather-img');
    weatherImg.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`
    currentDayList.classList.add('current-day');
    //Adding innerHTML in order to add line breaks between the weather list that is displayed
    currentDayList.innerHTML = `${data[0].dt_txt.slice(0, 11)} <br> Current Temperature: ${data[0].main.temp}C <br> Feels like: ${data[0].main.feels_like}C <br> Wind Speed: ${data[0].wind.speed} mph`
    currentCity.appendChild(currentDayList);
    cityDisplay.textContent = cityName;
    cityDisplay.appendChild(weatherImg);


    //In order to get the five day forecast there is a for loop that is going through the array every 5 elements to get new days

    for (let i = 1; i < data.length; i += 8) {
        const fiveDayDates = document.createElement('h3');
        fiveDayDates.classList.add('future-forecast');
        const futureTemp = document.createElement('li');
        futureTemp.classList.add('weather-info');
        const fiveDayImg = document.createElement('img');
        const fiveDayIcon = data[i].weather[0].icon;
        fiveDayImg.classList.add('five-day-img');
        fiveDayImg.src = `https://openweathermap.org/img/wn/${fiveDayIcon}.png`;
        futureTemp.innerHTML = `Temperature: ${data[i].main.temp}C <br> Feels like: ${data[i].main.feels_like}C <br> Wind Speed: ${data[i].wind.speed} mph`;
        //Slicing the date to not allow the time to show on each of the headers
        fiveDayDates.textContent = data[i].dt_txt.slice(0, 11);
        fiveDays.appendChild(fiveDayDates);
        fiveDayDates.appendChild(futureTemp);
        fiveDayDates.appendChild(fiveDayImg);
    };
}
//Adding the event listener to the seach button that has been globally declared and preventing its default submit function
searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    cityName = cityInput.value.trim();
    //Stopping the function if a city name is not entered and is left blank
    if (!cityName) {
        return
    } else {
        //Clearing all of the text content in the boxes before calling on the functions to show the newly seached city
        currentCity.textContent = '';
        fiveDays.textContent = '';
        cityDisplay.textContent = '';
    }
    cityDisplay.textContent = cityName;
    storeCities(cityName);
    getCoordinates(cityName);
})

//Goes through and stringifies the already parsed array of cities and unshifting it to make the most recent search appear at th top of the list
function storeCities(cityName) {
    if (cities.includes(cityName)) {
        return
    };
    cities.unshift(cityName);
    localStorage.setItem("cities", JSON.stringify(cities));
};
//Going through the array of cities and creating buttons with the city names, using an includes method so that the same city is not included more than once
function renderCityList() {
    const pastCities = document.querySelector('.past-cities');
    if (!cities.length) {
        return;
    }
    let recentSearches = cities.slice(0, 5);
    for (let i = 0; i < recentSearches.length; i++) {
        let cityItem = document.createElement('button');
        cityItem.textContent = recentSearches[i];
        cityItem.classList.add('list-items');
        pastCities.appendChild(cityItem);
        //Creating event listeners for each of the buttons so that the user can click on them and receive information about that city
        cityItem.addEventListener('click', function () {
            cityName = cityItem.textContent;
            fiveDays.textContent = '';
            currentCity.textContent = '';
            cityDisplay.textContent = '';
            cityDisplay.textContent = cityName;
            getCoordinates(cityName);
            storeCities(cityName);
        })
    }
}

renderCityList();