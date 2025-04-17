// script.js
document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
        document.getElementById('weatherIcon').src = weatherIcon;

        document.getElementById('weatherResult').classList.remove('hidden');
    } catch (error) {
        alert('Error fetching weather data. Please try again.');
    }
});