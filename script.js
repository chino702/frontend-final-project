document.addEventListener('DOMContentLoaded', function() {

    function fetchData() {

        fetch('https://www.freeforexapi.com/api/live?pairs=EURUSD,EURGBP,GBPUSD,USDJPY,AUDUSD,USDCHF,NZDUSD,USDCAD,USDZAR')

        .then(response => response.json())

        .then(data => { 

           const rates =data.rates;

           const tableBody = document.querySelector('#ratesTable tbody');

           for (const pair in rates) {

            const row = document.createElement('tr');
            const pairCell = document.createElement('td');
            const rateCell = document.createElement('td');

            pairCell.textContent = pair;
            rateCell.textContent = rates[pair].rates;

            row.appendChild(pairCell);
            row.appendChild(rateCell);

            tableBody.appendChild(row);
           }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }  

    fetchData();
});