const fs = require("fs/promises");
const path = require("path");

const db = path.join(__dirname, "../../db/recipes.json");

async function getAll() {
  const recipes = await fs.readFile(db);
  return JSON.parse(recipes);
}

async function get(id) {
  const recipes = await getAll();
  const itemID = parseInt(id);
  return recipes.find((recipe) => recipe.id === itemID);
}

async function save(newRecipe) {
  const allRecipes = await getAll();
  newRecipe.id = allRecipes.length + 1;
  allRecipes.push(newRecipe);
  await fs.writeFile(db, JSON.stringify(allRecipes));
  return newRecipe;
}

async function update(id, updated) {
  const allRecipes = await getAll();
  updated.id = parseInt(id);
  const updatedRecipes = allRecipes.map((r) =>
    r.id === updated.id ? updated : r
  );
  await fs.writeFile(db, JSON.stringify(updatedRecipes));

  return updated;
}

async function remove(id) {
  const allRecipes = await getAll();
  idToRemove = parseInt(id);
  const updatedRecipes = allRecipes.filter((r) => r.id !== idToRemove);
  await fs.writeFile(db, JSON.stringify(updatedRecipes));
}

module.exports = {
  getAll,
  get,
  save,
  update,
  remove,
};
