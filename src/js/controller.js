import * as model from './model.js'
import recipeView from './views/recipeView'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';


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
    recipeView.renderError()
  }
}

const controlSearchResults = async function() {
  try{
    const query = searchView.getQuery();
    if(!query) return;

    await model.loadSearchResults(query)
    console.log(model.state.search.results)

  }catch(err){
    console.log(err)
  }
}

const init = function() {
  recipeView.addHandlerRender(controlRecipies);
  searchView.addHandlerSearch(controlSearchResults);

}
init();