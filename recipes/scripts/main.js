import recipes from './recipes.mjs';

// Function to generate a random number >= 0 and < num
function random(num) {
    return Math.floor(Math.random() * num);
}

// Function to get a random recipe from the list
function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

// Function to create the recipe template
function recipeTemplate(recipe) {
    return `
        <figure class="recipe">
            <img src="${recipe.image}" alt="image of ${recipe.name}" />
            <figcaption>
                <ul class="recipe__tags">
                    ${tagsTemplate(recipe.tags)}
                </ul>
                <h2><a href="#">${recipe.name}</a></h2>
                <p class="recipe__ratings">
                    ${ratingTemplate(recipe.rating)}
                </p>
                <p class="recipe__description">
                    ${recipe.description}
                </p>
            </figcaption>
        </figure>
    `;
}

// Function to create the tags template
function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

// Function to create the rating template
function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    html += `</span>`;
    return html;
}

// Function to render the recipes
function renderRecipes(recipeList) {
    const recipeOutput = document.getElementById('recipe-output');
    recipeOutput.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
}

// Init function to show a random recipe on load
function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

// Filter recipes based on the query
function filterRecipes(query) {
    const filtered = recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
            recipe.ingredients.find(ingredient => ingredient.toLowerCase().includes(query))
        );
    });

    // Sort by name alphabetically
    const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
}

// Search handler function
function searchHandler(e) {
    e.preventDefault();
    const searchInput = document.querySelector('header input').value.toLowerCase();
    const filteredRecipes = filterRecipes(searchInput);
    renderRecipes(filteredRecipes);
}

// Attach event listener to the search button
document.querySelector('header button').addEventListener('click', searchHandler);

// Run the init function on page load
init();
