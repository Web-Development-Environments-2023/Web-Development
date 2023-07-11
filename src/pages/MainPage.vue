<template>
    <div class="main-page">
        <div class="left-column">
            <h2>Explore These Recipes</h2>
            <div class="recipe-list">
                <div class="recipe-preview-container" v-for="recipe in randomRecipes" :key="recipe.name">
                    <RecipePreview :recipe="recipe" customClass="main-page-preview"></RecipePreview>
                </div>
            </div>
            <button @click="fetchRandomRecipes">Get New Recipes</button>
        </div>
        <div class="right-column">
            <h2>Last Watched Recipes</h2>
            <div v-if="!$root.store.username">
                <button @click="redirectToLogin">Log in to view</button>
            </div>
            <div v-else>
                <div class="watched-recipes">
                    <div v-if="lastWatchedRecipes.length === 0">
                        No last viewed recipes found.
                    </div>
                    <div v-else class="recipe-list">
                        <div class="recipe-preview-container" v-for="recipe in lastWatchedRecipes" :key="recipe.name">
                            <RecipePreview :recipe="recipe" customClass="main-page-preview"></RecipePreview>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { state } from "/src/store.js";
import RecipePreview from "@/components/RecipePreview.vue";

export default {
    components: {
        RecipePreview,
    },
    data() {
        return {
            randomRecipes: [], // Placeholder for random recipes data
            lastWatchedRecipes: [], // Placeholder for last watched recipes data
        };
    },
    methods: {
        async fetchRandomRecipes() {
            await this.axios
                .get(state.server_domain + "/recipes/get_random_recipes")
                .then((response) => {
                    this.randomRecipes = response.data;
                })
                .catch((error) => {
                    console.error(error);
                    this.randomRecipes = [];
                });
        },
        async fetchLastWatchedRecipes() {
            await this.axios
                .get(state.server_domain + "/users/watched")
                .then((response) => {
                    this.lastWatchedRecipes = response.data.slice(-3).reverse();
                })
                .catch((error) => {
                    console.error(error);
                    this.lastWatchedRecipes = [];
                });
        },
        redirectToLogin() {
            this.$router.push("/login").catch(() => {
                this.$forceUpdate();
            });
        },
    },
    mounted() {
        // Fetch initial data on page load
        this.fetchRandomRecipes(); // Fetch random recipes
        this.fetchLastWatchedRecipes(); // Fetch user login status and last watched recipes
    },
};
</script>
  
<style>
.main-page {
    display: flex;
    padding: 0 20px;
    /* Add padding to the sides */
}

.left-column {
    flex: 1;
    margin-right: 20px;
}

.right-column {
    flex: 1;
}

.recipe-list {
    display: flex;
    flex-wrap: wrap;
}

.recipe-preview-container {
    flex: 0 0 100%;
    /* Each recipe preview container takes 100% width */
    padding-bottom: 20px;
}

.main-page-preview {
    flex: 0 0 100%;
    padding-bottom: 20px;
}
</style>
  