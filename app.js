const apiKey = '259732ad877973e83ca3d7b8a7160479'; // Replace with your actual API key

        async function getWeather() {
            const city = document.getElementById('city').value.trim();
            if (city === '') {
                alert('Please enter a city name');
                return;
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('City not found');
                }
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                alert(error.message);
            }
        }

        async function getLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

                    try {
                        const response = await fetch(url);
                        if (!response.ok) {
                            throw new Error('Unable to fetch weather data');
                        }
                        const data = await response.json();
                        displayWeather(data);
                    } catch (error) {
                        alert(error.message);
                    }
                }, () => {
                    alert('Unable to retrieve your location');
                });
            } else {
                alert('Geolocation is not supported by this browser');
            }
        }

        function displayWeather(data) {
            const weatherResult = document.getElementById('weather-result');
            const weatherIcon = getWeatherIcon(data.weather[0].main);
            weatherResult.innerHTML = `
                <div><strong>City:</strong> ${data.name}</div>
                <div><strong>Temperature:</strong> ${data.main.temp} °C</div>
                <div><strong>Weather:</strong> ${data.weather[0].description}</div>
                <div class="weather-icon">${weatherIcon}</div>
                <div><strong>Humidity:</strong> ${data.main.humidity} %</div>
                <div><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
            `;
        }

        function getWeatherIcon(weather) {
            switch (weather.toLowerCase()) {
                case 'clear':
                    return '<i class="fas fa-sun"></i>';
                case 'clouds':
                    return '<i class="fas fa-cloud"></i>';
                case 'rain':
                    return '<i class="fas fa-cloud-showers-heavy"></i>';
                case 'snow':
                    return '<i class="fas fa-snowflake"></i>';
                case 'thunderstorm':
                    return '<i class="fas fa-bolt"></i>';
                case 'drizzle':
                    return '<i class="fas fa-cloud-rain"></i>';
                case 'mist':
                case 'fog':
                    return '<i class="fas fa-smog"></i>';
                default:
                    return '<i class="fas fa-cloud"></i>';
            }
        }