document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

// Listen for Enter key press on the input field
document.getElementById('cityInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeather(); // Simulate button click
    }
});

function getWeather() {
    let city = document.getElementById('cityInput').value;
    const apiKey = 'cf59e28ab4b1462f824173520240210'; // Replace with your actual WeatherAPI key

    // Check if the entered city is "Delhi", then append ",IN" for India
    if (city.toLowerCase() === 'delhi') {
        city = 'New delhi'; // Specify New Delhi
    }
    console.log('City:', city); 

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    if (!city) {
        displayError('Please enter a city name.');
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            const weatherData = data.current;
            const locationData = data.location;

            // Log weather condition to see what we get
            console.log("Weather condition:", weatherData.condition.text);

            // Update background based on the weather condition
            updateBackground(weatherData.condition.text);

            weatherResult.innerHTML = `
    <h2>${locationData.name}, ${locationData.country}</h2>
    <img src="${weatherData.condition.icon}" alt="Weather Icon">
    <p class="temperature"><strong>${weatherData.temp_c} °C</strong></p> <!-- Updated temperature display -->
    <p>${weatherData.condition.text}</p>
    <p>Wind: ${weatherData.wind_kph} kph</p>
    <p>Humidity: ${weatherData.humidity}%</p>
    
`;

            weatherResult.style.display = 'block';
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayError(message) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `<p id="error-message">${message}</p>`;
    weatherResult.style.display = 'block';
}

// Function to update the background image based on weather condition
function updateBackground(condition) {
    let bgImageUrl = '';

    // Normalize the condition text for easier matching (case-insensitive, trimmed)
    const normalizedCondition = condition.toLowerCase().trim();

    switch (true) {
        case normalizedCondition.includes('sunny'):
        case normalizedCondition.includes('clear'):
            bgImageUrl = 'https://plus.unsplash.com/premium_photo-1677105700661-dbfad22793ca?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            break;
        case normalizedCondition.includes('cloud'):
            bgImageUrl = 'https://img.freepik.com/free-photo/grassy-field-with-leafless-trees-distance-cloudy-sky-background_181624-4535.jpg?w=826&t=st=1727944902~exp=1727945502~hmac=920671aa5052cc6ff7fc6ec5d084b1c9707869aab4b3f5130bac92b99ed6058d';
            break;
        case normalizedCondition.includes('rain'):
        case normalizedCondition.includes('drizzle'):
            bgImageUrl = 'https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg';
            break;
        case normalizedCondition.includes('snow'):
            bgImageUrl = 'https://images.unsplash.com/photo-1519305035628-5b1b8936c601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE2fHxzbm93fGVufDB8fHx8MTY4MTMxNDU5OQ&ixlib=rb-4.0.3&q=80&w=1080';
            break;
        default:
            bgImageUrl = 'https://plus.unsplash.com/premium_photo-1677105700661-dbfad22793ca?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Fallback image
    }

    document.body.style.backgroundImage = `url('${bgImageUrl}')`;
    document.body.style.backgroundSize = 'cover'; // Ensures the image covers the entire background
    document.body.style.backgroundPosition = 'center'; // Centers the background image
    document.body.style.backgroundRepeat = 'no-repeat'; // Prevents background image from repeating
}



