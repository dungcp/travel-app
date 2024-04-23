// Setup empty JS object to act as endpoint for all routes
const fetch = require("node-fetch");
const path = require("path");
const port = 8081;
// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static(path.join(__dirname, "dist")));

app.use("/img", express.static(path.join(__dirname, "src", "client", "img")));
app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

// Test
const mockAPIResponse = require("./mockAPI.js");

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/all-apis", (req, res) => {
  const appInputData = {
    input: req.body,
  };
  const geonamesAPI = `http://api.geonames.org/searchJSON?name=${req.body.destinationInput}&maxRows=1&username=${process.env.GEONAMES_USER}`;
  fetch(geonamesAPI)
    .then((res) => res.json())
    .then((geonamesData) => {
      const weatherbitAPI = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${geonamesData.geonames[0].lat}&lon=${geonamesData.geonames[0].lng}&key=${process.env.WEATHERBIT_KEY}`;
      fetch(weatherbitAPI)
        .then((res) => res.json())
        .then((weatherbitData) => {
          const pixabayAPI = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${req.body.destinationInput}&image_type=photo&editors_choice=true&per_page=3`;
          // Get Pixabay Dynamic Data
          fetch(pixabayAPI)
            .then((res) => res.json())
            .then((pixabayData) => {
              const pixabayDefaultAPI = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=travel&image_type=photo&editors_choice=true&per_page=3`;
              // Get Pixabay Default Data
              fetch(pixabayDefaultAPI)
                .then((res) => res.json())
                .then((pixabayDefaultData) => {
                  res.send({
                    appInputData,
                    geonamesData,
                    weatherbitData,
                    pixabayData,
                    pixabayDefaultData,
                  });
                });
            });
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log("Running server on port 8081 with CORS enabled.");
});
