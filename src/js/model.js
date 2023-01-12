export const state = {
    recipe: {},
};

export const loadRecipe = async function (id) {
    try {

        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=21f69c26-359d-4bec-b6ee-39e668f1d708`);
        const data = await res.json()
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        console.log(res)
        console.log(data)
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
        console.error(err)
    }
}