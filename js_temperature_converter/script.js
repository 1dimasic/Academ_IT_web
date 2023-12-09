document.addEventListener("DOMContentLoaded", function () {


    const form = document.getElementById("form");
    const celsius = document.getElementById("celsius");
    const kelvin = document.getElementById("kelvin");
    const fahrenheit = document.getElementById("fahrenheit");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        kelvin.textContent = "";
        fahrenheit.textContent = "";
        let celsius_temperature = celsius.value.trim();

        if (celsius_temperature.length === 0) {
            return;
        }

        celsius_temperature = Number(celsius_temperature);

        if (isNaN(celsius_temperature)) {
            celsius.value = "";
            return;
        }

        const kelvin_temperature = Number(celsius_temperature) + 273.15;
        const fahrenheit_temperature = Number(celsius_temperature) * 1.8 + 32;

        const kelvin_output_message = document.createElement("label");
        kelvin_output_message.textContent = "Температура по шкале Кельвина - " +
            String(Math.floor(kelvin_temperature * 100) / 100);

        const fahrenheit_output_message = document.createElement("label");
        fahrenheit_output_message.textContent = "Температура по шкале Фаренгейта - " +
            String(Math.floor(fahrenheit_temperature * 100) / 100);

        kelvin.appendChild(kelvin_output_message);
        fahrenheit.appendChild(fahrenheit_output_message);
        celsius.value = "";
    });
});