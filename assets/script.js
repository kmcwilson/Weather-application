const searchBtn= document.getElementById('search-btn');
let cities=JSON.parse(localStorage.getItem('cities'))|| [];
const cityInput= document.querySelector('.input-city');
const apiKey= '924b7419ff70c0bc92431d764dab8a64';
let pastCities= document.querySelector('.past-cities');

// weatherIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${weatherIcon}.png`);


const daysForecast= 'https://openweathermap.org/forecast5'



function getCoordinates(cityName){
const requestUrl= `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
fetch(requestUrl)

.then(function(response){
    return response.json();
})
.then(function(data){
    let lat= data[0].lat;
    let lon=data[0].lon;
    console.log(data);
// for (let i=0; i<5; i++){
//     let 
// }
searchWeather(lat, lon);
})
};

function searchWeather(lat, lon){
let secondUrl=  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
fetch(secondUrl)

    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.list);
        displayWeather(data.list);
        })
}
 

 function displayWeather(data){
    for(let i=0; i < data.length; i+=8){
        let currentCity=document.getElementById('current-city');
        let currentDay= document.createElement('p');  
         currentDay.textContent= `Current Temperature:${data[i].main.temp}`;
         currentCity.appendChild(currentDay);
 }
 };

searchBtn.addEventListener('click', function(){
 let cityName=cityInput.value;
    storeCities(cityName);
    getCoordinates(cityName);
})


function storeCities(cityName){
    cities.push(cityName);
localStorage.setItem("cities", JSON.stringify(cities));
let cityList= document.createElement('li');
cityList.classList.add('list-items');
cityList.textContent=cityName;
pastCities.appendChild(cityList);
console.log(cities);
// for (let i=0; i<localStorage.length; i++){
// localStorage.getItem[i];
// }
};

function renderCityList(){
    if(!cities.length){
        return;
    }
    for (let i=0; i<cities.length; i++){
    let cityItem= document.createElement('li');
    cityItem.textContent=cities[i];
    cityItem.classList.add('list-items');
    pastCities.appendChild(cityItem);
 }
}

renderCityList();