import * as model from './model.js'
import recipeView from './views/recipeView'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

if (module.hot) {
  module.hot.accept();
};

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
    recipeView.renderError()
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    console.log(resultsView)

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query)

    console.log(model.state.search.results)
    resultsView.render(model.state.search.results)

  } catch (err) {
    console.log(err)
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipies);
  searchView.addHandlerSearch(controlSearchResults);

}
init();