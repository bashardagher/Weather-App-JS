const container = document.querySelector('.container')
const search = document.querySelector('.search-box')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const err = document.querySelector('.not-found')

search.addEventListener('click',()=>{
    const APIKey = 'aa6183de6ad1052e3dbcc78b6a8d0e63';
    const city = document.querySelector('.search-box input').value;
    if(city=='')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        if(json.cod=='404'){
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            err.classList.add('active');
            return;
        }
        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        err.classList.remove('active');
        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'images/clear.png';
                image.alt = 'clear';
                break;
            case 'Rain': 
                image.src = 'images/rain.png';
                image.alt = 'rain';
                break;
            case 'Snow': 
                image.src = 'images/snow.png';
                image.alt = 'snow';
                break;
            case 'Clouds': 
                image.src = 'images/cloud.png';
                image.alt = 'cloud';
                break;
            case 'Mist': 
                image.src = 'images/mist.png';
                image.alt = 'mist';
                break;
            case 'Haze': 
                image.src = 'images/mist.png';
                image.alt = 'haze';
                break;
            default:
                image.src = 'images/cloud.png';
                image.alt = 'cloud';
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
        wind.innerHTML = `${json.wind.speed}Km/h`;
    })
})
