document.addEventListener('DOMContentLoaded', () => {
    function fetchData() {
        fetch('http://localhost:3000/api/rates')
            .then(response => response.json())
            .then(data => {
                const rates = data;

                const tableBody = document.querySelector('#ratesTable tbody');
                for (const pair in rates) {
                    const row = document.createElement('tr');
                    const pairCell = document.createElement('td');
                    const rateCell = document.createElement('td');

                    pairCell.textContent = pair;
                    rateCell.textContent = rates[pair].rate;

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
