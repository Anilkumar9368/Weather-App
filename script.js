async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = 'b7d1f84f89864162ae720306252506';

  if (!city) {
    document.getElementById('weatherResult').innerHTML = `<p style="color:red;">Please enter a city name.</p>`;
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    document.getElementById('weatherResult').innerHTML = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <p>📅 Local Time: ${data.location.localtime}</p>
      <p>🌡 Temp: ${data.current.temp_c} °C / ${data.current.temp_f} °F</p>
      <p>🌤 Condition: ${data.current.condition.text}</p>
      <p>💧 Humidity: ${data.current.humidity}%</p>
      <p>💨 Wind: ${data.current.wind_kph} kph</p>
      <img src="https:${data.current.condition.icon}" alt="weather icon" />
    `;
  } catch (error) {
    document.getElementById('weatherResult').innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
