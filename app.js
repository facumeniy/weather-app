// SELECTORS
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const celsiusBtn = document.getElementById('celsius');
const fahrBtn = document.getElementById('fahrenheit');

const cityInfo = document.getElementById('city-info');
const cityName = document.getElementById('city-name');
const cityTemp = document.getElementById('temp');
const cityDay = document.getElementById('city-day');
const cityHour = document.getElementById('city-hour');
const tempSelect = document.getElementById('change-temp');
const weatherIcon = document.getElementById('weather-icon');
const feelksLike = document.getElementById('feels-like');
const cityHumidity = document.getElementById('city-humidity');
const windSpeed = document.getElementById('wind-speed');

const firstDay = document.getElementById('first-day');
const secondDay = document.getElementById('second-day');
const thirdDay = document.getElementById('third-day');
const fourthDay = document.getElementById('fourth-day');
const fifthDay = document.getElementById('fifth-day');

const firstTemp = document.getElementById('first-temp');
const secondTemp = document.getElementById('second-temp');
const thirdTemp = document.getElementById('third-temp');
const fourthTemp = document.getElementById('fourth-temp');
const fifthTemp = document.getElementById('fifth-temp');

const firstIcon = document.getElementById('first-icon');
const secondIcon = document.getElementById('second-icon');
const thirdIcon = document.getElementById('third-icon');
const fourthIcon = document.getElementById('fourth-icon');
const fifthIcon = document.getElementById('fifth-icon');

// GLOBACL VARIABLES
let day = "";
// FUNCTIONS
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
        windSpeedMph: `${Math.round((cityData.wind.speed) * 2.236936)} mph`,
        windSpeedKmh: `${Math.round((cityData.wind.speed) * 3.6)} km/h`,
        timezone: cityData.timezone,
    }
}

async function getCityForecast(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=d6c5ea0d9f6334f0d51cb2e9112e333b`, {mode: 'cors'})
    const cityData = await response.json();

    return {
        oneCel: `${Math.round(cityData.list[6].main.temp_min - 273.15)} °C`,
        oneFahr: `${((cityData.list[6].main.temp_min - 273.15) * 9/5 + 32).toFixed(0)} °F`,
        oneWeather: cityData.list[6].weather[0].description,

        twoCel: `${Math.round(cityData.list[14].main.temp_min - 273.15)} °C`,
        twoFahr: `${((cityData.list[14].main.temp_min - 273.15) * 9/5 + 32).toFixed(0)} °F`,
        twoWeather: cityData.list[14].weather[0].description,

        threeCel: `${Math.round(cityData.list[22].main.temp_min - 273.15)} °C`,
        threeFahr: `${((cityData.list[22].main.temp_min - 273.15) * 9/5 + 32).toFixed(0)} °F`,
        threeWeather: cityData.list[22].weather[0].description,

        fourCel: `${Math.round(cityData.list[30].main.temp_min - 273.15)} °C`,
        fourFahr: `${((cityData.list[30].main.temp_min - 273.15) * 9/5 + 32).toFixed(0)} °F`,
        fourWeather: cityData.list[30].weather[0].description,
        
        fiveCel: `${Math.round(cityData.list[38].main.temp_min - 273.15)} °C`,
        fiveFahr: `${((cityData.list[38].main.temp_min - 273.15) * 9/5 + 32).toFixed(0)} °F`,
        fiveWeather: cityData.list[38].weather[0].description,
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateCity(city){
    city.then(city => {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let week = [];

        cityInfo.innerText = capitalizeFirstLetter(city.description);
        cityName.innerText = city.name;
        cityTemp.innerText = city.celsiusTemp;

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
        }

        let nextDay = (new Date().getDay() + 1);
        week = [];

        for (let i = 0; i < 6; i++) {
            const dayIndex = (nextDay + i) % 7;
            week.push((days[dayIndex]));
        }

        firstDay.innerHTML = week[0];
        secondDay.innerHTML = week[1];
        thirdDay.innerHTML = week[2];
        fourthDay.innerHTML = week[3];
        fifthDay.innerHTML = week[4];

        // DAY IN COUNTRY
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const date = new Date();
        let dayOfMonth = parseInt(date.getDate());
        day = parseInt(date.getDay());
        const month = date.getMonth();
        const year = date.getFullYear();
        // HOUR IN COUNTRY
        const timezoneOffset = city.timezone;
        const currentTime = new Date();
        let currentHour = ((currentTime.getHours() + timezoneOffset / 60 / 60) + 3);
        if(currentHour > 24){
            currentHour = `0${currentHour - 24}`;
            dayOfMonth++;
            day++;

            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            let nextDay = (new Date().getDay() + 1);
            week = [];

            for (let i = 0; i < 6; i++) {
                const dayIndex = (nextDay + i) % 7;
                week.push((days[dayIndex]));
            }

            firstDay.innerHTML = week[0];
            secondDay.innerHTML = week[1];
            thirdDay.innerHTML = week[2];
            fourthDay.innerHTML = week[3];
            fifthDay.innerHTML = week[4];
        }
        let currentMinute = currentTime.getMinutes();
        if(currentMinute < 10){
            currentMinute = `0${currentMinute}`;
        }
        cityDay.innerText = `${days[day]}, ${months[month]} ${dayOfMonth} of ${year}`;
        cityHour.innerText = `${currentHour}:${currentMinute}`;

        feelksLike.innerText = city.feelsLikeCel;
        cityHumidity.innerText = city.humidity;
        windSpeed.innerText = city.windSpeedKmh;
    })
}

function updateForecast(city){
    city.then(city => {
        firstTemp.innerHTML = city.oneCel;
        secondTemp.innerHTML = city.twoCel;
        thirdTemp.innerHTML = city.threeCel;
        fourthTemp.innerHTML = city.fourCel;
        fifthTemp.innerHTML = city.fiveCel;

        if(city.oneWeather.includes('clouds')){
            firstIcon.innerText = "cloud";
        }else if(city.oneWeather.includes('clear')){
            firstIcon.innerText = "sunny";
        }else if(city.oneWeather.includes('rain')){
            firstIcon.innerText = "rainy";
        }else if(city.oneWeather.includes('drizzle')){
            firstIcon.innerText = "rainy";
        }else if(city.oneWeather.includes('snow')){
            firstIcon.innerText = "weather_snowy";
        }

        if(city.twoWeather.includes('clouds')){
            secondIcon.innerText = "cloud";
        }else if(city.twoWeather.includes('clear')){
            secondIcon.innerText = "sunny";
        }else if(city.twoWeather.includes('rain')){
            secondIcon.innerText = "rainy";
        }else if(city.twoWeather.includes('drizzle')){
            secondIcon.innerText = "rainy";
        }else if(city.twoWeather.includes('snow')){
            secondIcon.innerText = "weather_snowy";
        }

        if(city.threeWeather.includes('clouds')){
            thirdIcon.innerText = "cloud";
        }else if(city.threeWeather.includes('clear')){
            thirdIcon.innerText = "sunny";
        }else if(city.threeWeather.includes('rain')){
            thirdIcon.innerText = "rainy";
        }else if(city.threeWeather.includes('drizzle')){
            thirdIcon.innerText = "rainy";
        }else if(city.threeWeather.includes('snow')){
            thirdIcon.innerText = "weather_snowy";
        }

        if(city.fourWeather.includes('clouds')){
            fourthIcon.innerText = "cloud";
        }else if(city.fourWeather.includes('clear')){
            fourthIcon.innerText = "sunny";
        }else if(city.fourWeather.includes('rain')){
            fourthIcon.innerText = "rainy";
        }else if(city.fourWeather.includes('drizzle')){
            fourthIcon.innerText = "rainy";
        }else if(city.fourWeather.includes('snow')){
            fourthIcon.innerText = "weather_snowy";
        }

        if(city.fiveWeather.includes('clouds')){
            fifthIcon.innerText = "cloud";
        }else if(city.fiveWeather.includes('clear')){
            fifthIcon.innerText = "sunny";
        }else if(city.fiveWeather.includes('rain')){
            fifthIcon.innerText = "rainy";
        }else if(city.fiveWeather.includes('drizzle')){
            fifthIcon.innerText = "rainy";
        }else if(city.fiveWeather.includes('snow')){
            fifthIcon.innerText = "weather_snowy";
        }
    })
}

// ONLOAD
let currentCity = getCityInfo("buenos aires");
let cityForecast = getCityForecast("buenos aires");

updateCity(currentCity);
updateForecast(cityForecast);

tempSelect.style.display = "block";
// EVENT LISTENERS
searchBtn.addEventListener('click', () => {
    currentCity = getCityInfo(searchBar.value);
    cityForecast = getCityForecast(searchBar.value);

    updateCity(currentCity);
    updateForecast(cityForecast);
});

celsiusBtn.addEventListener('click', () => {
    currentCity.then(city => {
        cityTemp.innerText = city.celsiusTemp;
        feelksLike.innerText = city.feelsLikeCel;
        windSpeed.innerText = city.windSpeedKmh;
    })
    cityForecast.then(city => {
        firstTemp.innerText = city.oneCel;
        secondTemp.innerText = city.twoCel;
        thirdTemp.innerText = city.threeCel;
        fourthTemp.innerText = city.fourCel;
        fifthTemp.innerText = city.fiveCel;
    });
})

fahrBtn.addEventListener('click', () => {
    currentCity.then(city => {
        cityTemp.innerText = city.fahrenheitTemp;
        feelksLike.innerText = city.feelsLikeFahr;
        windSpeed.innerText = city.windSpeedMph;
    });
    cityForecast.then(city => {
        firstTemp.innerText = city.oneFahr;
        secondTemp.innerText = city.twoFahr;
        thirdTemp.innerText = city.threeFahr;
        fourthTemp.innerText = city.fourFahr;
        fifthTemp.innerText = city.fiveFahr;
    });
})



