import * as model from './model.js'
import recipeView from './views/recipeView'
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipies = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id)

    if (!id) return;
    recipeView.renderSpinner();
    //load recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    console.error(err);
  }
}

const u = ['hashchange', 'load'];
u.forEach(ev =>
  window.addEventListener(ev, controlRecipies)
);

// window.addEventListener('hashchange', controlRecipies)
// window.addEventListener('load', controlRecipies)