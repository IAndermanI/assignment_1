// Загрузка данных
fetch('../data/films.json')
    .then(response => response.json())
    .then(data => {
        window.films = data;
        renderFilms(data);
        addSearchListener();
    });

// Рендеринг карточек
function renderFilms(films) {
    const container = document.getElementById('filmContainer');
    container.innerHTML = films.map(film => `
    <div class="film-card">
      <h2>${film.title}</h2>
      <div class="film-detail">
        <div>📅 Year: ${film.release_year}</div>
        <div>🎥 Director: ${film.director}</div>
        <div>🌍 Country: ${film.country}</div>
        <div>💰 Revenue: $${film.box_office.toLocaleString()}</div>
      </div>
    </div>
  `).join('');
}

// Функции сортировки
function sortByYear() {
    films.sort((a, b) => a.release_year - b.release_year);
    renderFilms(films);
}

function sortByRevenue() {
    films.sort((a, b) => b.box_office - a.box_office);
    renderFilms(films);
}

// Поиск
function addSearchListener() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = window.films.filter(film =>
            film.title.toLowerCase().includes(searchTerm) ||
            film.director.toLowerCase().includes(searchTerm)
        );
        renderFilms(filtered);
    });
}