1) Project Summary
 - This project build out a travel app that, at a minimum, obtains a desired trip location and date from the user, and display weather and an image of location using information obtained from external APIs, project using 3 APIs,have use Webpack environment, using express server with nodejs.
 2) Extra Project Efforts
 - display length of trip
 - Pull in an image for the country from Pixabay API when the entered location brings up no results.
 - Use Local Storage(opens in a new tab) to save the data so that when they close, then revisit the page, their information is still there.
 - Instead of just pulling a single day forecast, pull the forecast for multiple days.
 - Allow user to Print their trip and/or export to PDF.
 - Allow the user to add a todo list and/or packing list for their trip.
 3) Api Credentials
 - Create an user account at Geonames, WeatherBit, Pixabay
 - Create file .env for Api credentials.
 4) installation guide
 - install nodejs
 - install all modules list as dependencies in package.json using command line npm install
 - run unit test, using command line npm test namefile
 - run production environment and build npm run build-prod
 - run local server http://localhost:8081/, terminal command line npm run start
