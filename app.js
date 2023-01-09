const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');

const cityInfo = document.getElementById('city-info');
const cityName = document.getElementById('city-name');
const cityTemp = document.getElementById('temp');
const cityHour = document.getElementById('city-hour');

const weatherIcon = document.getElementById('weather-icon');

async function getCityInfo(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d6c5ea0d9f6334f0d51cb2e9112e333b`, {mode: 'cors'})
    const cityData = await response.json();

    return{
        name: cityData.name,
        country: cityData.sys.country,
        description: cityData.weather[0].description,
        celsiusTemp: `${Math.round(cityData.main.temp - 273.15)} °C`,
        fahrenheitTemp: `${((cityData.main.temp - 273.15) * 9/5 + 32).toFixed(0)} °F`,
        feelsLikeCel: `${Math.round(cityData.main.feels_like - 273.15)} °C`,
        feelsLikeFahr: `${((cityData.main.feels_like - 273.15) * 9/5 + 32).toFixed(0)} °F`,
        humidity: `${cityData.main.humidity}%`,
        celsiusMaxTemp: `${Math.round(cityData.main.temp_max - 273.15)} °C`,
        celsiusMinTemp: `${Math.round(cityData.main.temp_min - 273.15)} °C`,
        fahrenheitMaxTemp: `${((cityData.main.temp_max - 273.15) * 9/5 + 32).toFixed(0)} °F`,
        fahrenheitMinTemp: `${((cityData.main.temp_min - 273.15) * 9/5 + 32).toFixed(0)} °F`,
        windSpeed: `${Math.round(cityData.wind.speed)} mph`,
        timezone: cityData.timezone,
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

 searchBtn.addEventListener('click', () => {
    let city = getCityInfo(searchBar.value);
    
    city.then(city => {
        cityInfo.innerText = capitalizeFirstLetter(city.description);
        cityName.innerText = city.name;
        cityTemp.innerText = city.celsiusTemp;
        console.log(city.country);

        let weatherDescription = city.description;

        if(weatherDescription.includes('clouds')){
            weatherIcon.innerText = "cloud";
        }else if(weatherDescription.includes('clear')){
            weatherIcon.innerText = "sunny";
        }else if(weatherDescription.includes('rain')){
            weatherIcon.innerText = "rainy";
        }else if(weatherDescription.includes('drizzle')){
            weatherIcon.innerText = "rainy";
        }else if(weatherDescription.includes('snow')){
            weatherIcon.innerText = "weather_snowy";
        }else if(weatherDescription.includes('tornado')){
            weatherIcon.innerText = "tornado";
        }

        const timezoneOffset = city.timezone;
        const currentTime = new Date();
        let currentHour = ((currentTime.getHours() + timezoneOffset / 60 / 60) + 3);
        if(currentHour > 24){
            currentHour = `0${currentHour - 24}`;
        }
        let currentMinute = currentTime.getMinutes();
        if(currentMinute < 10){
            currentMinute = `0${currentMinute}`;
        }

        cityHour.innerText = `${currentHour}:${currentMinute}`;

    })
})



