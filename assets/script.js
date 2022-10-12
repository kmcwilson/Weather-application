const searchBtn = document.getElementById('search-btn');
let cities = JSON.parse(localStorage.getItem('cities')) || [];
let cityInput = document.querySelector('.input-city');
const currentCity = document.getElementById('current-city');
const fiveDays = document.getElementById('long-forecast');
const apiKey = '924b7419ff70c0bc92431d764dab8a64';
let cityDisplay = document.getElementById('city-header');
let cityName = cityInput.value.trim();




const daysForecast = 'https://openweathermap.org/forecast5'



function getCoordinates(cityName) {
    const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
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



function displayWeather(data) {

    const currentDayList = document.createElement('li');
    const weatherImg = document.createElement('img');
    const weatherIcon = data[0].weather[0].icon;
    weatherImg.classList.add('weather-img');
    weatherImg.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`
    currentDayList.classList.add('current-day');
    currentDayList.innerHTML = `${data[0].dt_txt.slice(0, 11)} <br> Current Temperature: ${data[0].main.temp}C <br> Feels like: ${data[0].main.feels_like}C <br> Wind Speed: ${data[0].wind.speed} mph`
    currentCity.appendChild(currentDayList);
    cityDisplay.textContent = cityName;
    cityDisplay.appendChild(weatherImg);




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
        fiveDayDates.textContent = data[i].dt_txt.slice(0, 11);
        fiveDays.appendChild(fiveDayDates);
        fiveDayDates.appendChild(futureTemp);
        fiveDayDates.appendChild(fiveDayImg);
    };
}

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    cityName = cityInput.value.trim();
    if (!cityName) {
        return
    } else {
        currentCity.textContent = '';
        fiveDays.textContent = '';
        cityDisplay.textContent = '';
    }
    cityDisplay.textContent = cityName;
    storeCities(cityName);
    getCoordinates(cityName);
})


function storeCities(cityName) {
    if (cities.includes(cityName)) {
        return
    };
    cities.unshift(cityName);
    localStorage.setItem("cities", JSON.stringify(cities));
};

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