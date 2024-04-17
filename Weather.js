const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");

const weatherCard = document.querySelector(".weatherCard");
const apiKey = "d7f28e613f164c891223b8cfb0d4d4d5";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city");
    }

});

async function getWeatherData(city) {

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);

    if (!response.ok) {
        throw new Error("Invalid City !!");
    }
    else {
        return await response.json();
    }

}

function displayWeatherInfo(data) {
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    weatherCard.textContent = "";
    weatherCard.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");
    weatherCard.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    tempDisplay.classList.add("tempDisplay");
    weatherCard.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity : ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");
    weatherCard.appendChild(humidityDisplay);

    descriptionDisplay.textContent = description;
    descriptionDisplay.classList.add("descriptionDisplay");
    weatherCard.appendChild(descriptionDisplay);

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");
    weatherCard.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⚡";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId == 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "🌥";
        default:
            return "⁉";

    }

}

function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add(".errorDisplay");

    weatherCard.textContent = "";
    weatherCard.style.display = "flex";
    weatherCard.appendChild(errorDisplay);
}