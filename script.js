const csvUrl = 'database.csv';

Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: function (results) {
        const data = results.data;
        const table = document.querySelector('#csvTable');
        const tableHead = table.querySelector('thead tr');
        const tableBody = table.querySelector('tbody');

        Object.keys(data[0]).forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tableHead.appendChild(th);
        });

        data.forEach(rowData => {
            const tr = document.createElement('tr');
            Object.values(rowData).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });

        e$('#csvTable').DataTable({
            searching: false,
            pagingType: 'full_numbers'
        });

        const searchInput = document.querySelector('#searchInput');
        searchInput.addEventListener('keyup', () => {
            const searchText = searchInput.value.toLowerCase();
            const rows = tableBody.querySelectorAll('tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                let found = false;
                cells.forEach(cell => {
                    if (cell.textContent.toLowerCase().includes(searchText)) {
                        found = true;
                    }
                });
                if (found) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
});
