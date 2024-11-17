document.addEventListener('DOMContentLoaded', function () {
    console.log("Welcome to DeenHub!");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(fetchPrayerTimes, handleLocationError);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function fetchPrayerTimes(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const prayerTimesAPI = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`;

        fetch(prayerTimesAPI)
            .then(response => response.json())
            .then(data => {
                if (data.data && data.data.timings) {
                    const timings = data.data.timings;
                    const prayerList = document.getElementById('prayer-list');
                    const locationDiv = document.getElementById('location');
                    const locationName = data.data.location.city;

                    locationDiv.innerHTML = `<h4>Prayer Times in ${locationName}</h4>`;

                    prayerList.innerHTML = `
                        <li>Fajr: ${timings.Fajr}</li>
                        <li>Zuhr: ${timings.Dhuhr}</li>
                        <li>Asr: ${timings.Asr}</li>
                        <li>Maghrib: ${timings.Maghrib}</li>
                        <li>Isha: ${timings.Isha}</li>
                    `;
                } else {
                    console.error('Prayer times data not available.');
                }
            })
            .catch(error => console.error('Error fetching prayer times:', error));
    }

    function handleLocationError(error) {
        console.error("Geolocation error:", error);
        alert("Location access is required to fetch prayer times.");
    }

    // Weather API request
    function fetchWeather(lat, lon) {
        const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_REAL_API_KEY&units=metric`;

        fetch(weatherAPI)
            .then(response => response.json())
            .then(data => {
                const weatherElement = document.getElementById('weather');
                weatherElement.innerHTML = `
                    <h3>Weather for Today</h3>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>${data.weather[0].description}</p>
                `;
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    // Theme toggle functionality
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggleButton.textContent = document.body.classList.contains('dark-theme') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });

    // Start location fetching
    getLocation();
});
