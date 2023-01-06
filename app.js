async function getCityInfo(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d6c5ea0d9f6334f0d51cb2e9112e333b`, {mode: 'cors'})
    const cityData = await response.json();

    console.log(cityData);

     return{
        name: cityData.name,
        description: cityData.weather[0].description,

        

    }
}


