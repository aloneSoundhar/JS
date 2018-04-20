// Init storage
const storage = new Store();

// Get stored location Data
const weatherLocation = storage.getLocationData();

// Initialize Weather class
const weather = new Weather(weatherLocation.city, weatherLocation.state);
// Intialize UI class
const ui = new UI();


// Get weather on dom Load
document.addEventListener('DOMContentLoaded', getWeather);

// Change location event Listener
document.getElementById('w-changeBtn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;

    // Change location
    weather.changeLocation(city, state);
    
    // Set location in local Storage
    storage.setLocationData(city, state);

    // get and Display weather
    getWeather();

    // Close the modal
    $('#locModal').modal('hide');
})

function getWeather() {
    weather.getWeather()
    .then(data => {
        ui.paint(data);
    })
    .catch(err => console.log(err));
}
