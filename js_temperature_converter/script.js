document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const celsiusTextField = document.querySelector(".celsius-text-field");
    const outputKelvin = document.querySelector(".output_kelvin");
    const outputFahrenheit = document.querySelector(".output_fahrenheit");
    const errorMessage = document.querySelector(".error_message");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        outputKelvin.textContent = "";
        outputFahrenheit.textContent = "";

        const celsiusTemperatureString = celsiusTextField.value.trim();
        errorMessage.classList.remove("invalid");

        if (celsiusTemperatureString.length === 0) {
            errorMessage.classList.add("invalid");
            return;
        }

        const celsiusTemperature = Number(celsiusTemperatureString);

        if (isNaN(celsiusTemperature)) {
            errorMessage.classList.add("invalid");
            return;
        }

        const kelvinTemperature = celsiusTemperature + 273.15;
        const fahrenheitTemperature = celsiusTemperature * 1.8 + 32;

        outputKelvin.textContent = "Температура по шкале Кельвина: " +
            kelvinTemperature.toFixed(2);

        outputFahrenheit.textContent = "Температура по шкале Фаренгейта: " +
            fahrenheitTemperature.toFixed(2);
    });
});