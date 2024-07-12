const recipesServices = require("../services/recipes");

// function throwNotFoundError() {}

async function recipeExist(req, res, next) {
  const recipe = await recipesServices.get(req.params.id);

  if (!recipe) {
    const err = new Error("Recipe not found");
    err.statusCode = 404;
    next(err);
  } else {
    res.locals.recipe = recipe;
    next();
  }
}

async function getAll(req, res, next) {
  try {
    const allRecipes = await recipesServices.getAll();
    res.json({ data: allRecipes });
  } catch (error) {
    next(error);
  }
}

async function getDetails(req, res, next) {
  try {
    res.json({ data: res.locals.recipe });
  } catch (error) {
    next(error);
  }
}

async function save(req, res, next) {
  try {
    const {
      name,
      healthLabels,
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients,
    } = req.body;

    const newRecipe = {
      name,
      healthLabels: [...healthLabels],
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients: [...ingredients],
    };
    res.status(201).json({ data: await recipesServices.save(newRecipe) });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const {
      name,
      healthLabels,
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients,
    } = req.body;

    const updatedRecipe = recipesServices.update(req.params.id, {
      name,
      healthLabels: [...healthLabels],
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients: [...ingredients],
    });

    res.json({ data: updatedRecipe });
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    await recipesServices.remove(req.params.id);
    res.status(204);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getDetails: [recipeExist, getDetails],
  save,
  update: [recipeExist, update],
  remove: [recipeExist, remove],
};
