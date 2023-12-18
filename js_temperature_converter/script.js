document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const inputCelsius = document.getElementById("celsius");
    const outputKelvin = document.getElementById("kelvin");
    const outputFahrenheit = document.getElementById("fahrenheit");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        outputKelvin.textContent = "";
        outputFahrenheit.textContent = "";
        let celsiusTemperature = inputCelsius.value.trim();
        inputCelsius.classList.remove("invalid");

        if (celsiusTemperature.length === 0 || isNaN(Number(celsiusTemperature))) {
            inputCelsius.classList.add("invalid");
            return;
        }

        const kelvinTemperature = Number(celsiusTemperature) + 273.15;
        const fahrenheitTemperature = Number(celsiusTemperature) * 1.8 + 32;

        const kelvinOutputMessage = document.createElement("kelvin");
        kelvinOutputMessage.textContent = "Температура по шкале Кельвина: " +
            kelvinTemperature.toFixed(2).toString();

        const fahrenheitOutputMessage = document.createElement("fahrenheit");
        fahrenheitOutputMessage.textContent = "Температура по шкале Фаренгейта: " +
            fahrenheitTemperature.toFixed(2).toString();

        outputKelvin.appendChild(kelvinOutputMessage);
        outputFahrenheit.appendChild(fahrenheitOutputMessage);
    });
});