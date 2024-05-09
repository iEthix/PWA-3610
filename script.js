const fahrenheitInput = document.querySelector(".fahrenheit-input");
const celsiusInput = document.querySelector(".celsius-input");
const fahrenheitError = document.querySelector(".fahrenheit-error");
const celsiusError = document.querySelector(".celsius-error");
const resetButton = document.querySelector(".reset-button");

fahrenheitInput.addEventListener("input", function (event) {
  calculateCelsius(event.target);
});

celsiusInput.addEventListener("input", function (event) {
  calculateFahrenheit(event.target);
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("fahrenheit")) {
    fahrenheitInput.value = localStorage.getItem("fahrenheit");
    celsiusInput.value = localStorage.getItem("celsius");
  }
});

resetButton.addEventListener("click", function () {
  fahrenheitInput.value = "";
  celsiusInput.value = "";
  fahrenheitError.textContent = "";
  celsiusError.textContent = "";
  fahrenheitInput.style.borderColor = "";
  celsiusInput.style.borderColor = "";
  localStorage.removeItem("fahrenheit");
  localStorage.removeItem("celsius");
});

function calculateCelsius(input) {
  if (isNaN(input.value) || input.value === "") {
    input.style.borderColor = "red";
    fahrenheitError.textContent =
      input.value === "" ? "" : "Only numbers are allowed!";
    input.value = "";
  } else {
    input.value.borderColor = "";
    fahrenheitError.textContent = "";
    celsiusError.textContent = "";
    const celsiusValue = (((parseFloat(input.value) - 32) * 5) / 9).toFixed(2);
    celsiusInput.value = celsiusValue;
    localStorage.setItem("fahrenheit", input.value);
    localStorage.setItem("celsius", celsiusValue);
  }
}

function calculateFahrenheit(input) {
  if (isNaN(input.value) || input.value === "") {
    input.style.borderColor = "red";
    celsiusError.textContent =
      input.value === "" ? "" : "Only numbers are allowed!";
    input.value = "";
  } else {
    input.borderColor = "";
    celsiusError.textContent = "";
    fahrenheitError.textContent = "";
    const fahrenheitValue = ((parseFloat(input.value) * 9) / 5 + 32).toFixed(2);
    fahrenheitInput.value = fahrenheitValue;
    localStorage.setItem("fahrenheit", fahrenheitInput.value);
    localStorage.setItem("celsius", input.value);
  }
}

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
