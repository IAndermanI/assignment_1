let films = [];

// Load data from JSON
fetch('films.json')
    .then(response => response.json())
    .then(data => {
        films = data;
        renderFilms(films);
    })
    .catch(error => console.error('Error loading data:', error));

// Render films into the table
function renderFilms(data) {
    const tbody = document.getElementById('films-body');
    tbody.innerHTML = ''; // Clear existing rows

    data.forEach(film => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.release_year}</td>
            <td>${film.director}</td>
            <td>${formatRevenue(film.box_office)}</td>
            <td>${film.country}</td>
        `;
        tbody.appendChild(row);
    });
}

// Format box office revenue (e.g., 2500000000 → "$2.5B")
function formatRevenue(value) {
    if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
        return `$${(value / 1e6).toFixed(1)}M`;
    } else {
        return `$${value.toLocaleString()}`;
    }
}

// Sorting logic
function sortBy(criteria) {
    let sorted;
    switch(criteria) {
        case 'title':
            sorted = films.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'year':
            sorted = films.sort((a, b) => b.release_year - a.release_year);
            break;
        case 'revenue':
            sorted = films.sort((a, b) => b.box_office - a.box_office);
            break;
    }
    renderFilms(sorted);
}

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = films.filter(film => 
        film.title.toLowerCase().includes(query) ||
        film.director.toLowerCase().includes(query)
    );
    renderFilms(filtered);
});