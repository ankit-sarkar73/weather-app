document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const city = document.getElementById('city').value;
    fetch('/get_weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'city=' + city
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('weather-result').innerHTML = '<p>' + data.error + '</p>';
        } else {
            document.getElementById('weather-result').innerHTML = `
                <h2>${data.city}</h2>
                <p>${data.temperature}°C - ${data.description}</p>
                <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" alt="weather icon">
            `;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
