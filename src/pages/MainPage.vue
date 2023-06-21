<template>
    <div class="main-page">
        <div class="left-column">
            <h2>Explore These Recipes</h2>
            <div class="recipe-list">
                <div v-for="recipe in randomRecipes" :key="recipe.id">{{ recipe.title }}</div>
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
                    <div v-for="recipe in lastWatchedRecipes" :key="recipe.id">{{ recipe.title }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { state } from "/src/store.js";
export default {
    data() {
        return {
            randomRecipes: [], // Placeholder for random recipes data
            lastWatchedRecipes: [], // Placeholder for last watched recipes data
        };
    },
    methods: {
        fetchRandomRecipes() {
            this.randomRecipes = state.server_domain + "/recipes/get_random_recipes";
        },
        fetchLastWatchedRecipes() {
            try {
                // Make an asynchronous call to fetch last watched recipes
                this.axios.get(state.server_domain + '/users/watched')
                    .then(response => {
                        // Handle the response or update data properties
                        this.lastWatchedRecipes = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        // Handle the error or update data properties accordingly
                        this.lastWatchedRecipes = [];
                    });
            } catch (error) {
                console.error(error);
                // Handle the error or update data properties accordingly
                this.lastWatchedRecipes = [];
            }
        },
        redirectToLogin() {
            this.$router.push("/login").catch(() => {
                this.$forceUpdate();
            });
        }
    },
    mounted() {
        // Fetch initial data on page load
        this.fetchRandomRecipes(); // Fetch random recipes
        this.fetchLastWatchedRecipes();// Fetch user login status and last watched recipes
    }
};
</script>
  
<style>
.main-page {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.left-column {
    flex: 1;
    margin-right: 20px;
}

.right-column {
    flex: 1;
}

h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.recipe-list {
    margin-bottom: 20px;
}

.recipe-list div {
    margin-bottom: 10px;
}

.button-container {
    margin-top: 20px;
}

.button-container button {
    padding: 10px 15px;
    font-size: 16px;
}

.watched-recipes {
    margin-bottom: 20px;
}

.watched-recipes div {
    margin-bottom: 10px;
}

.button-container button {
    padding: 10px 15px;
    font-size: 16px;
}
</style>
