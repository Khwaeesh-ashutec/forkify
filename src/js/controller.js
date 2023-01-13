import * as model from './model.js'
import recipeView from './views/recipeView'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// };

const controlRecipies = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id)

    if (!id) return;
    recipeView.renderSpinner();

    // /Update results view to selected 
    resultsView.render(model.getSearchResultPage())

    //load recipe
    await model.loadRecipe(id);

    // Rendering recipe
    // recipeView.render(model.state.recipe);
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

    await model.loadSearchResults(query);

    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultPage(1));

    //pagination buttons
    paginationView.render(model.state.search)

  } catch (err) {
    console.log(err)
  }
}

controlPagination = function (goToPage) {
  // Render new results
  resultsView.render(model.getSearchResultPage(goToPage));

  // New pagination buttons
  paginationView.render(model.state.search)

  // console.log(goToPage)
}

const controlServings = function (newServings) {

  model.updateServings(newServings)

  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {
  model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
}



const init = function () {
  recipeView.addHandlerRender(controlRecipies);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();