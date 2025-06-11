// Recipe Vault - Store in localStorage
function getRecipes() {
  return JSON.parse(localStorage.getItem('recipes-vault') || '[]');
}

function saveRecipes(recipes) {
  localStorage.setItem('recipes-vault', JSON.stringify(recipes));
}

function renderRecipes() {
  const recipeList = document.getElementById('recipeList');
  recipeList.innerHTML = '';
  const recipes = getRecipes();
  if (recipes.length === 0) {
    recipeList.innerHTML = '<p style="color:#888;">No recipes yet. Add one!</p>';
    return;
  }
  recipes.forEach((recipe, idx) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <strong>Ingredients:</strong>
      <p>${recipe.ingredients.replace(/\n/g, '<br>')}</p>
      <strong>Instructions:</strong>
      <p>${recipe.instructions.replace(/\n/g, '<br>')}</p>
      <button class="delete-btn" title="Delete Recipe" data-idx="${idx}">Delete</button>
    `;
    recipeList.appendChild(card);
  });

  // Delete functionality
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = function() {
      if (confirm('Delete this recipe?')) {
        const idx = parseInt(btn.getAttribute('data-idx'));
        const recipes = getRecipes();
        recipes.splice(idx, 1);
        saveRecipes(recipes);
        renderRecipes();
      }
    }
  });
}

// Modal logic
const addRecipeBtn = document.getElementById('addRecipeBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const recipeForm = document.getElementById('recipeForm');

addRecipeBtn.onclick = function() {
  modal.style.display = 'flex';
}

closeModal.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Add recipe
recipeForm.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('recipeName').value.trim();
  const ingredients = document.getElementById('ingredients').value.trim();
  const instructions = document.getElementById('instructions').value.trim();

  if (!name || !ingredients || !instructions) return;

  const recipes = getRecipes();
  recipes.push({ name, ingredients, instructions });
  saveRecipes(recipes);
  renderRecipes();
  recipeForm.reset();
  modal.style.display = 'none';
}

// On load
renderRecipes();