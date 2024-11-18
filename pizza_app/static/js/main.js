document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display data
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('menu-data');
            tableBody.innerHTML = '';
            data.forEach(item => {
                const row = `<tr>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.description}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Form validation and submission
    const form = document.getElementById('add-item-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const price = document.getElementById('price');
        const description = document.getElementById('description');

        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
            return;
        }

        const newItem = {
            name: name.value,
            price: parseFloat(price.value),
            description: description.value
        };

        // Send POST request
        fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add item');
            }
            return response.json();
        })
        .then(data => {
            alert('Item added successfully!');
            form.reset();
            form.classList.remove('was-validated');
            // Optionally, refresh the data table
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add item. Please try again.');
        });
    });
});