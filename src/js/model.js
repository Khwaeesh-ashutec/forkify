import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerpage: RES_PER_PAGE,
    },
    bookmarks: [],
};

export const loadRecipe = async function (id) {
    try {
        // ?key=21f69c26-359d-4bec-b6ee-39e668f1d708
        const data = await getJSON(`${API_URL}${id}`)

        const { recipe } = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        }
        console.log(state.recipe);
    } catch (err) {
        console.error(`${err}🤦‍♀️🤦‍♂️🐱‍🐉`);
        throw err;
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        console.log(data);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
    } catch (err) {
        console.error(`${err} 😒🤷‍♀️🐱‍👤🤢`);
        throw err;
    }
};

export const getSearchResultPage = function (page = state.search.page) {
    state.search.page = page
    const start = (page - 1) * state.search.resultsPerpage; // 0 (1-1 )* 10)
    const end = page * state.search.resultsPerpage; //9 (page = 1,2 ,3,4... * 10 )

    return state.search.results.slice(start, end)
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
    })
    state.recipe.servings = newServings;
}

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    // mark curRecipe
    if (recipe.id === state.recipe.id) state.recipe.bokmarked = true;
}