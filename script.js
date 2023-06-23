document.addEventListener('DOMContentLoaded', () => {
    function fetchData() {
      fetch('http://localhost:3000/api/rates')
        .then(response => response.json())
        .then(data => {
          const rates = data;
  
          const tableBody = document.querySelector('#ratesTable tbody');
          tableBody.innerHTML = ''; 
  
          for (const pair in rates) {
            
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    const addPairButton = document.querySelector('#addPairButton');
    const currencyPairInput = document.querySelector('#currencyPairInput');
  
    addPairButton.addEventListener('click', () => {
      const currencyPair = currencyPairInput.value.toUpperCase();
      if (currencyPair.trim() !== '') {
        fetch(`http://localhost:3000/api/rates/${currencyPair}`)
          .then(response => response.json())
          .then(data => {
            const tableBody = document.querySelector('#ratesTable tbody');
            const row = document.createElement('tr');
            const pairCell = document.createElement('td');
            const rateCell = document.createElement('td');
  
            pairCell.textContent = currencyPair;
            rateCell.textContent = data.rate;
  
            row.appendChild(pairCell);
            row.appendChild(rateCell);
  
            tableBody.appendChild(row);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    });
  
    fetchData();
  });  