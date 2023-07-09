document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.querySelector('#darkModeToggle');
  const body = document.body;
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  setDarkMode(isDarkMode); // Set initial mode based on user preference

  darkModeToggle.addEventListener('click', () => {
    const newMode = !body.classList.contains('dark-mode');
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  });

  function setDarkMode(isDarkMode) {
    body.classList.toggle('dark-mode', isDarkMode);
    darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
  }

  function fetchData() {
    fetch('http://localhost:3000/api/rates')
      .then(response => response.json())
      .then(data => {
        const rates = data;

        const tableBody = document.querySelector('#ratesTable tbody');
        tableBody.innerHTML = '';

        for (const pair in rates) {
          updateTable(pair, rates[pair].rate);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const addPairButton = document.querySelector('#addPairButton');
  const currencyPairInput = document.querySelector('#currencyPairInput');
  const errorMessage = document.querySelector('#errorMessage');

  addPairButton.addEventListener('click', () => {
    const currencyPair = currencyPairInput.value.toUpperCase();
    if (currencyPair.trim() !== '') {
      validateCurrencyPair(currencyPair)
        .then(() => {
          fetch(`http://localhost:3000/api/rates/${currencyPair}`)
            .then(response => response.json())
            .then(data => {
              updateTable(currencyPair, data.rate);
              errorMessage.textContent = '';
              errorMessage.style.display = 'none';
            })
            .catch(error => {
              console.error('Error:', error);
            });
        })
        .catch(error => {
          errorMessage.textContent = error;
          errorMessage.style.display = 'block';
          setTimeout(() => {
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
          }, 3000); // Set the timeout duration (in milliseconds)
        });
    }
  });

  function validateCurrencyPair(currencyPair) {
    const availablePairs = ['EURUSD', 'EURGBP', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCHF', 'NZDUSD', 'USDCAD', 'USDZAR'];

    return new Promise((resolve, reject) => {
      if (availablePairs.includes(currencyPair)) {
        resolve();
      } else {
        reject('Currency pair is not available.');
      }
    });
  }

  function updateTable(currencyPair, rate) {
    const tableBody = document.querySelector('#ratesTable tbody');
    const row = document.createElement('tr');
    const pairCell = document.createElement('td');
    const rateCell = document.createElement('td');
    const removeButton = document.createElement('button');
    
    pairCell.textContent = currencyPair;
    rateCell.textContent = rate;
    
    const image = document.createElement('img');
    image.src = `https://www.freeforexapi.com/Images/${currencyPair}.png`;
    image.alt = currencyPair;
    image.classList.add('currency-image');
    pairCell.prepend(image);

    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', () => {
      removePair(currencyPair);
    });
  
    row.appendChild(pairCell);
    row.appendChild(rateCell);
    row.appendChild(removeButton);

    tableBody.appendChild(row);
  }

  function removePair(currencyPair) {
    //removes the pair from the user's view.
    const pairRows = document.querySelectorAll('#ratesTable tbody tr ');
    pairRows.forEach (row => {
      const pairCell = row.querySelector("td:first-child");
      if (pairCell.textContent === currencyPair) {
        row.style.display = 'none';
      }
    });
  }
    
  fetchData();
});