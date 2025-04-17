const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const weatherCard = document.getElementById('weatherCard');
const outfitSuggestion = document.getElementById('outfitSuggestion');
const locationInput = document.getElementById('locationInput');
const geoButton = document.getElementById('geoButton');

async function fetchWeather(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    alert('Error fetching weather data. Please try again.');
  }
}

function updateWeatherUI(data) {
  const { name, main, weather, wind } = data;
  const temperature = main.temp;
  const condition = weather[0].main;
  const humidity = main.humidity;
  const windSpeed = wind.speed;

  // Update Weather Card
  document.getElementById('cityName').textContent = name;
  document.getElementById('weatherCondition').textContent = condition;
  document.getElementById('temperature').textContent = `${temperature}°C`;
  document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
  document.getElementById('wind').textContent = `Wind: ${windSpeed} m/s`;

  // Update Outfit Suggestion
  const suggestion = getOutfitSuggestion(temperature, condition);
  document.getElementById('suggestionText').textContent = suggestion;

  // Show Cards
  weatherCard.classList.remove('hidden');
  outfitSuggestion.classList.remove('hidden');

  // Dynamic Background
  updateBackground(condition);
}

function getOutfitSuggestion(temp, condition) {
  if (temp < 10) return 'Wear a heavy jacket, scarf, and gloves.';
  if (temp < 20) return 'Wear a hoodie and jeans.';
  if (condition.includes('Rain')) return 'Bring an umbrella and wear waterproof boots.';
  if (temp > 30) return 'Wear a t-shirt, shorts, and sunscreen.';
  return 'Dress comfortably for the weather.';
}

function updateBackground(condition) {
  const body = document.body;
  body.className = 'min-h-screen flex flex-col items-center justify-center text-white'; // Reset classes
  if (condition.includes('Rain')) body.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-gray-600');
  else if (condition.includes('Clear')) body.classList.add('bg-gradient-to-r', 'from-yellow-300', 'to-orange-400');
  else if (condition.includes('Snow')) body.classList.add('bg-gradient-to-r', 'from-white', 'to-blue-200');
  else body.classList.add('bg-gradient-to-r', 'from-gray-400', 'to-gray-600');
}

// Event Listeners
document.getElementById('locationInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') fetchWeather(locationInput.value);
});

geoButton.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => updateWeatherUI(data));
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
});