const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');

// Load the script.js file and the test DOM
const script = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf-8');
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
const { document } = window;

// Load the script.js code into the test DOM environment
const scriptTag = document.createElement('script');
scriptTag.textContent = script;
document.body.appendChild(scriptTag);

// Expose fetch and other global functions to the test DOM environment
global.fetch = fetch;
global.document = document;
global.window = window;
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

// Load the script functions to be tested from the script.js file
const { fetchData, validateCurrencyPair, removePair } = window;

// Mock the fetch API response
jest.mock('node-fetch', () => jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ 
      EURUSD: { rate: 1.23 },
      EURGBP: { rate: 0.89 }
    })
  })
));

// Mock the DOM elements needed for the test
document.body.innerHTML = `
  <table id="ratesTable">
    <tbody id="tableBody"></tbody>
  </table>
`;

test('fetchData updates the table with correct data', async () => {
  await fetchData();
  
  // Check if the table has been updated with the correct data
  const tableBody = document.querySelector('#ratesTable tbody');
  expect(tableBody.innerHTML).toContain('<td>EURUSD</td><td>1.23</td>');
  expect(tableBody.innerHTML).toContain('<td>EURGBP</td><td>0.89</td>');
});

test('validateCurrencyPair resolves with valid currency pair', async () => {
  const currencyPair = 'EURUSD';
  await expect(validateCurrencyPair(currencyPair)).resolves.toBeUndefined();
});

test('validateCurrencyPair rejects with invalid currency pair', async () => {
  const currencyPair = 'INVALID';
  await expect(validateCurrencyPair(currencyPair)).rejects.toEqual('Currency pair is not available.');
});

test('removePair hides the row with the specified currency pair', () => {
  // Set up the initial table with a row containing EURUSD
  document.querySelector('#tableBody').innerHTML = `
    <tr>
      <td>EURUSD</td>
      <td>1.23</td>
      <td><button>Remove</button></td>
    </tr>
  `;

  // Call removePair with currency pair EURUSD
  removePair('EURUSD');

  // Check if the row with EURUSD is hidden
  const hiddenRow = document.querySelector('#tableBody tr[style="display: none;"]');
  expect(hiddenRow).toBeTruthy();
});