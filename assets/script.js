const searchBtn= document.getElementById('search-btn');
const cities=[];
const cityInput= document.querySelector('.input-city');
const apiKey= '924b7419ff70c0bc92431d764dab8a64';

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
   for(let i=0; i<data.list.length; i+=8){
    let currentCity=document.getElementById('current-city')
        console.log(data.list[i]);
        // currentCity.innerHTML= data.list[i];

   }
    })
 }


searchBtn.addEventListener('click', function(){
 let cityName=cityInput.value;
    storeCities(cityName);
    getCoordinates(cityName);
})

function storeCities(cityName){
let pastCities= document.querySelector('.past-cities');
    cities.push(cityName);
localStorage.setItem("cities", cities);
let cityList= document.createElement('li');
cityList.classList.add('list-items');
cityList.textContent=cityName;
pastCities.appendChild(cityList);
localStorage.getItem(cityList);
// for (let i=0; i<localStorage.length; i++){
// localStorage.getItem[i];
// }

};

