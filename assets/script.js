const searchBtn = document.getElementById('search-btn');
let cities = JSON.parse(localStorage.getItem('cities')) || [];
let cityInput = document.querySelector('.input-city');
const currentCity = document.getElementById('current-city');
const fiveDays = document.getElementById('long-forecast');
const apiKey = '924b7419ff70c0bc92431d764dab8a64';
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
            console.log(data);
        })
};

function searchWeather(lat, lon) {
    let secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(secondUrl)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayWeather(data.list);
        })

};



function displayWeather(data) {

    const currentDayList = document.createElement('li');
    const feelsLike = document.createElement('li');
    const weatherImg = document.createElement('img');
    const weatherIcon = data[0].weather[0].icon;
    const currentDate = document.createElement('li');
    let cityDisplay = document.getElementById('city-header');
    weatherImg.classList.add('weather-img');
    weatherImg.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`
    currentDayList.classList.add('current-day');
    currentDayList.textContent = `Current Temperature: ${data[0].main.temp}`;
    feelsLike.textContent = `Feels like: ${data[0].main.feels_like}`
    currentCity.appendChild(currentDayList);
    currentCity.appendChild(feelsLike);
    currentCity.appendChild(weatherImg);
    cityDisplay.textContent = cityName;
    currentDate.textContent = data[0].dt_txt.slice(0, 11);
    cityDisplay.appendChild(currentDate);



    for (let i = 1; i < data.length; i += 8) {
        const fiveDayDates = document.createElement('h3');
        fiveDayDates.classList.add('future-forecast');
        const futureTemp = document.createElement('li');
        futureTemp.classList.add('weather-info');
        const fiveDayImg = document.createElement('img');
        const fiveDayIcon = data[i].weather[0].icon;
        fiveDayImg.classList.add('five-day-img');
        fiveDayImg.src = `https://openweathermap.org/img/wn/${fiveDayIcon}.png`;
        futureTemp.textContent = `Temperature: ${data[i].main.temp}`;
        fiveDayDates.textContent = data[i].dt_txt.slice(0, 11);
        fiveDays.appendChild(fiveDayDates);
        fiveDayDates.appendChild(futureTemp);
        fiveDayDates.appendChild(fiveDayImg);
    };
}

searchBtn.addEventListener('click', function () {
    if (!cityName) {
        return
    } else {
        currentCity.textContent = '';
        fiveDays.textContent = '';
    }
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
            getCoordinates(cityName);
            storeCities(cityName);
        })
    }
}

renderCityList();