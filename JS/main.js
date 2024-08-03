document.getElementById('logFile').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const content = e.target.result;
                parseLog(content);
            } catch (error) {
                alert('Invalid JSON File. Please upload a valid JSON file.');
            }
        };
        reader.readAsText(file);
    }
});

function parseLog(content) {
    try {
        const logs = JSON.parse(content);
        const tableBody = document.querySelector('#logTable tbody');
        tableBody.innerHTML = '';

        logs.forEach(log => {
            const row = document.createElement('tr');
            row.classList.add('log-row');
            row.innerHTML = `
                <td>${log['Object type'] || ''}</td>
                <td>${log['Object'] || ''}</td>
                <td>${log['Risk level'] || ''}</td>
                <td>${log['Action'] || ''}</td>
                <td>${log['Expiration'] || ''}</td>
                <td>${log['Source'] || ''}</td>
                <td>${log['Source details'] || ''}</td>
                <td>${log['Description'] || ''}</td>
                <td>${log['Last updated'] || ''}</td>
            `;
            tableBody.appendChild(row);
        });

        document.getElementById('search').addEventListener('input', filterTable);
    } catch (error) {
        alert('Invalid JSON File. Please upload a valid JSON file.');
    }
}

function filterTable() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#logTable tbody .log-row');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowText = Array.from(cells)
            .map(cell => cell.textContent.toLowerCase())
            .join(' ');
        row.style.display = rowText.includes(searchTerm) ? '' : 'none';
    });
}