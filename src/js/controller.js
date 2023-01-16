import * as model from './model.js'
import recipeView from './views/recipeView'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// if (module.hot) {
//   module.hot.accept();
// };

const controlRecipies = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // /Update results view to selected 
    resultsView.update(model.getSearchResultPage());

    bookmarksView.update(model.state.bookmarks)
    //load recipe
    await model.loadRecipe(id);

    // Rendering recipe
    // recipeView.render(model.state.recipe);
    recipeView.render(model.state.recipe);


  } catch (err) {
    recipeView.renderError();
    console.error(err)
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
  //1) Add - Remove Bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id);
  //2) Update View
  recipeView.update(model.state.recipe);

  // 3) render Bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  try {
    //Spinnner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe)

    // render recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();

    //bookmarkView
    bookmarksView.render(model.state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // closeForm 
    setTimeout(function () {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);

  } catch (err) {
    console.error('🤣❌', err)
    addRecipeView.renderError(err.message)
  }
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipies);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();