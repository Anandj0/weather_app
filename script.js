import API_KEY from "./apiKey.js";

const apiKey = API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            liveWeather(latitude, longitude);
        },(error) => {
            console.error(error);
        })
    } else {
        console.error("Geolocation is not supported by this browser");
    }
}
getLocation();

async function liveWeather(latitude, longitude) {
    const response = await fetch(apiUrl + `&lat=${latitude}` + `&lon=${longitude}` + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else
        showData(response);
}

async function checkWeather(city) {

    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else
        showData(response);
}

async function showData(response) {
    var data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);

})

searchBox.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
    }

})
