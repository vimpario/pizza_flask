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

            const menuContainer = document.getElementById('menu-data-card');
            menuContainer.innerHTML = '';

            data.forEach(item => {
                const card = `
                <div class="col-md-4 col-sm-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">$${item.price.toFixed(2)}</h6>
                            <p class="card-text">${item.description}</p>
                            <button class="btn btn-primary btn-sm view-details" data-bs-toggle="modal" data-bs-target="#detailsModal" data-name="${item.name}" data-price="${item.price}" data-description="${item.description}">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>`;
                menuContainer.innerHTML += card;
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

    document.body.addEventListener('click', event => {
        if (event.target.classList.contains('view-details')) {
            const button = event.target;
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            const description = button.getAttribute('data-description');

            document.getElementById('modal-name').innerText = name;
            document.getElementById('modal-price').innerText = `$${parseFloat(price).toFixed(2)}`;
            document.getElementById('modal-description').innerText = description;
        }
    });
});