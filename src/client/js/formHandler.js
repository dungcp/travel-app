const handleSubmit = document.querySelector(".generate-button");

handleSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const departDateInput = document.querySelector("#depart-date-input").value;
  const returnDateInput = document.querySelector("#return-date-input").value;
  const destinationInput = document.querySelector("#destination-input").value;
  const remarksInput = document.querySelector("#remarks-input").value;
  const destinationName = document.querySelector("#destination-name");
  const nameCountry = document.querySelector("#country-name");
  const codeCountry = document.querySelector("#country-code");
  const timeZone = document.querySelector("#time-zone");
  const population = document.querySelector("#population");
  const desDescription = document.querySelector("#destination-description");
  const departDate = document.querySelector("#depart-date");
  const returnDate = document.querySelector("#return-date");
  const weatherWrapper = document.querySelector(".weather-wrapper");
  const hotel = document.querySelector("#hotel").value;
  const hotelOutput = document.querySelector(".hotel-output");
  const todoList = document.querySelectorAll("#todo-list li");
  const packageList = document.querySelectorAll("#packing-list li");
  const listTodoOutput = document.querySelector("#list-todo-output");
  const listPackageOutput = document.querySelector("#list-packing-output");

  const dayDiff = Client.dayDiffCheck(Client.currentDate(), departDateInput);
  const tripDay = Client.dayDiffCheck(departDateInput, returnDateInput);

  let listTodo = [];
  let listPackage = [];

  todoList.forEach(function (item) {
    const textContent = item.textContent.trim();
    if (textContent) {
      listTodo.push(textContent);
    }
  });

  packageList.forEach(function (item) {
    const textContent = item.textContent.trim();
    if (textContent) {
      listPackage.push(textContent);
    }
  });

  if (
    departDateInput.length === 0 ||
    returnDateInput.length === 0 ||
    destinationInput.length === 0
  ) {
    alert("Date and destination fields are required.");
    return;
  }

  // Validation - Minimum Date
  if (!Client.minDate(departDateInput) || !Client.minDate(returnDateInput)) {
    alert("The minimum date is today.");
    return;
  }

  const loading = document.querySelector(".loading");
  loading.innerHTML = "loading...";
  // Fetch APIs
  fetch("http://localhost:8080/all-apis", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ destinationInput, remarksInput, hotel }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data) return;

      loading.innerHTML = "";
      const outputOuter = document.querySelector(".print-area");
      const closeButton = document.querySelector(".buttons");
      outputOuter.style.display = "block";
      closeButton.style.display = "flex";

      const destinationMeta = document.querySelector(".destination-meta");
      if (!data.pixabayData.hits[0]) {
        destinationMeta.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${data.pixabayDefaultData.hits[0].webformatURL}")`;
      } else {
        destinationMeta.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
        url("${data.pixabayData.hits[0].webformatURL}")`;
      }
      destinationName.innerHTML = `${data.geonamesData.geonames[0].toponymName}`;
      nameCountry.innerHTML = `${data.geonamesData.geonames[0].countryName}`;
      codeCountry.innerHTML = `${data.geonamesData.geonames[0].countryCode}`;
      timeZone.innerHTML = `${data.weatherbitData.timezone}`;
      hotelOutput.innerHTML = `${data.appInputData.input.hotel}`;
      population.innerHTML = `${data.geonamesData.geonames[0].population}`;
      desDescription.innerHTML = `${data.geonamesData.geonames[0].fcodeName}`;
      departDate.innerHTML = departDateInput;
      returnDate.innerHTML = returnDateInput;
      weatherWrapper.innerHTML = "";
      document.querySelector(
        ".trip-day"
      ).innerHTML = `<div id="counter">${tripDay}</div><div id="counter-text">day trip</div>`;

      listTodoOutput.insertAdjacentHTML(
        "beforeend",
        `${listTodo
          .map((item) => {
            return `<li>${item}</li>`;
          })
          .join("")}`
      );

      listPackageOutput.insertAdjacentHTML(
        "beforeend",
        `${listPackage
          .map((item) => {
            return `<li>${item}</li>`;
          })
          .join("")}`
      );

      if (dayDiff > 15) {
        weatherWrapper.innerHTML = `<div class='weather-message'>Weather forecast info is only available for 15 days from the current date.</div>`;
      } else {
        for (let i = dayDiff; i < data.weatherbitData.data.length - 1; i++) {
          const weatherData = data.weatherbitData.data[i];
          if (
            weatherData &&
            weatherData.weather &&
            weatherData.weather.icon &&
            weatherData.high_temp &&
            weatherData.low_temp &&
            weatherData.datetime
          ) {
            const weatherCard = document.createElement("div");
            weatherCard.className = "weather-card";

            weatherCard.insertAdjacentHTML(
              "afterbegin",
              `
                            <div class="temp-wrapper">
                                <span id="temp-high" class="temp">${data.weatherbitData.data[i]?.high_temp}°C</span>
                                <i class="material-icons">import_export</i>
                                <span id="temp-low" class="temp">${data.weatherbitData.data[i]?.low_temp}°C</span>
                                <div id="temp-date" class="temp-date">${data.weatherbitData.data[i]?.datetime}</div>
                            </div>
                        `
            );

            weatherWrapper.append(weatherCard);
          }
        }
      }
    });
});

module.exports = handleSubmit;
