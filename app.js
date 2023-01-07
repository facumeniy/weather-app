const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');

const cityName = document.getElementById('city-name');
const cityTemp = document.getElementById('temp');

async function getCityInfo(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d6c5ea0d9f6334f0d51cb2e9112e333b`, {mode: 'cors'})
    const cityData = await response.json();

    return{
        name: cityData.name,
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
    }
}

  

 searchBtn.addEventListener('click', () => {
    let city = getCityInfo(searchBar.value);
    
    city.then(city => {
        cityName.innerText = city.name;
        cityTemp.innerText = city.celsiusTemp;
    })

})


