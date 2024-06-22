import recipes from './recipes.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm.querySelector('input');
    const recipeCard = document.querySelector('.recipe-card');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        const recipe = recipes.find(r => r.title.toLowerCase().includes(searchTerm));
        if (recipe) {
            updateRecipeCard(recipe);
        } else {
            recipeCard.innerHTML = '<p>Recipe not found</p>';
        }
    });
});

function updateRecipeCard(recipe) {
    const recipeCard = document.querySelector('.recipe-card');
    recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <div class="recipe-info">
            <div class="tags">
                ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <h2>${recipe.title}</h2>
            <div class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
                ${'<span aria-hidden="true" class="icon-star">⭐</span>'.repeat(recipe.rating)}
                ${'<span aria-hidden="true" class="icon-star-empty">☆</span>'.repeat(5 - recipe.rating)}
            </div>
            <p class="description">${recipe.description}</p>
        </div>
    `;
}
