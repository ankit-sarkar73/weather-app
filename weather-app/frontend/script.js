document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const city = document.getElementById('city').value;
    const url = `http://127.0.0.1:5000/get_weather?city=${encodeURIComponent(city)}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('weather-result').innerHTML = '<p>' + data.error + '</p>';
        } else {
            document.getElementById('weather-result').innerHTML = `
                <h2>${data.city}</h2>
                <p>${data.temperature}°C - ${data.description}</p>
            `;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
