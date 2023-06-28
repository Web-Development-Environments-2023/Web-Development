<template>
    <div class="RecipePreview">
        <a href="#" class="recipe-preview" @click="navigateToRecipe">
            <b-card :img-src="recipe.image" img-alt="Image" img-top tag="article" class="mb-2">
                <div class="recipe-details">
                    <h3 class="recipe-title">{{ recipe.title }}</h3>
                    <p>Ready in {{ recipe.readyInMinutes }} minutes.</p>
                    <p>Popularity: {{ recipe.aggregateLikes }}.</p>
                    <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}.</p>
                    <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}.</p>
                </div>
            </b-card>
        </a>
    </div>
</template>

<script>
import { state } from "/src/store.js";

export default {
    name: "RecipePreview",
    props: {
        recipe: {
            type: Object,
            required: true
        }
    },
    methods: {
        navigateToRecipe() {
            const payload = {
                recipeId: this.recipe.id
            };
            this.axios
                .post(`${state.server_domain}/users/watched`, payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => { /* console.log('Recipe ID logged successfully:', response.data); */ })
                .catch(error => { console.error('Error logging recipe ID:', error); })
                .finally(() => { this.$router.push({ name: 'recipe', params: { recipeId: payload.recipeId } }); });
        }
    }
};
</script>

<style scoped>
.RecipePreview {
    margin-bottom: 20px;
}

.RecipePreview .recipe-preview {
    text-decoration: none;
}

.RecipePreview .recipe-preview:hover {
    opacity: 0.8;
}

.RecipePreview .recipe-card {
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.RecipePreview .recipe-card img {
    width: 100%;
    height: auto;
}

.RecipePreview .recipe-title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
}

.RecipePreview .recipe-details {
    padding: 10px;
}

.RecipePreview .recipe-details p {
    margin-bottom: 5px;
    font-size: 14px;
    color: #888;
}

.RecipePreview .recipe-details .popularity {
    color: #f95c5c;
}

.RecipePreview .recipe-details .vegan,
.RecipePreview .recipe-details .gluten-free {
    color: #6cc070;
}

.RecipePreview .recipe-details .vegan::before,
.RecipePreview .recipe-details .gluten-free::before {
    content: "•";
    margin-right: 5px;
}

.RecipePreview .recipe-details .vegan::before {
    color: #6cc070;
}

.RecipePreview .recipe-details .gluten-free::before {
    color: #6cc070;
}
</style>