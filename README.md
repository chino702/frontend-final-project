# FX Tracker

FX Tracker is a simple web application for tracking Forex exchange rates. It allows users to view exchange rates for different currency pairs and toggle between dark and light mode.

## Features

- View exchange rates for popular currency pairs.
- Toggle between dark and light mode for a personalized experience.
- Add or remove currency pairs from the list.
- Link to the currency pairs available with the Free Forex API.

## Getting Started

To run the FX Tracker application on your local machine, follow these steps:

1. Clone this repository to your local machine.
2. Open the `index.html` file in your web browser.
3. The application should load, and you can start using it to track exchange rates.

## Dependencies

To run this project, you will need the following dependencies:

- [axios](https://www.npmjs.com/package/axios) (^1.4.0) - A library for making HTTP requests.
- [node-fetch](https://www.npmjs.com/package/node-fetch) (^3.3.1) - A library for running the server.js file.

You can install these dependencies by running the following command in your project's root directory:

npm install

### CORS Issue

Please note that this application uses the Free Forex API to fetch exchange rate data. Since the API is hosted on a different domain, you might encounter a CORS issue when running the application locally. To resolve this, you have a few options:

1. Install a browser extension that allows you to bypass CORS restrictions during development. There are various extensions available for popular browsers like Chrome and Firefox.

2. Run a local server to serve your application and proxy the API requests to avoid CORS issues. We have provided a simple `server.js` file in the server directory for this purpose. Here's how you can run the server:

   - Ensure you have Node.js installed on your machine.
   - Open a terminal or command prompt and navigate to the project directory.
   - Install the necessary dependencies by running: `npm install`.
   - Start the server by running: `node server.js`.
   - The server will be up and running at `http://localhost:3000`, and it will proxy API requests to the Free Forex API.

Please note that these solutions are intended for development purposes only. When deploying your application to a production environment, make sure to handle CORS properly and follow best practices for security and data privacy.

## Usage

- On the main page, you will see a list of currency pairs and their respective exchange rates.
- To toggle between dark and light mode, click on the "Toggle Dark Mode" button.
- To add a new currency pair to the list, enter the currency pair code (e.g., EURUSD) in the input field and click "Add Pair."
- If the currency pair is available, it will be added to the list with its exchange rate.
- If the currency pair is not available or if there is an error, an error message will be displayed.

## Languages Used

- HTML
- CSS
- JavaScript

## API Reference

The FX Tracker application uses the Free Forex API to fetch exchange rate data for currency pairs. The API documentation can be found at [https://www.freeforexapi.com](https://www.freeforexapi.com).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The Free Forex API for providing the exchange rate data.