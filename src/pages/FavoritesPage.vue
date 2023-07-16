<template>
  <div class="favorite-recipes">
    <div class="recipe-list">
      <div class="fav-recipe-preview-container" v-for="recipe in favorite" :key="recipe.name">
        <RecipePreview :recipe="recipe" customClass="main-page-preview"></RecipePreview>
      </div>
      <div v-if="loading" class="loading-message">Loading favorite recipes...</div>
      <div v-if="favorite.length === 0 && !loading" class="no-recipes-message">No favorite recipes found.</div>
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
      favorite: [], // Placeholder for favorite recipes data
      loading: false, // Flag to indicate if data is being loaded
    };
  },
  methods: {
    async fetchFavoriteRecipes() {
      try {
        this.loading = true; // Set loading flag to true before fetching data
        const response = await this.axios.get(state.server_domain + "/users/favorites");
        this.favorite = response.data;
      } catch (error) {
        console.error(error);
        this.favorite = [];
      } finally {
        this.loading = false; // Set loading flag to false after data is fetched
      }
    },
  },
  mounted() {
    // Fetch initial data on page load
    this.fetchFavoriteRecipes(); // Fetch favorite recipes
  },
};
</script>

<style>
.favorite-recipes {
  margin-top: 20px;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.fav-recipe-preview-container {
  flex: 0 0 50%;
  margin-bottom: 20px;
}

.fav-recipe-preview-container:last-child {
  margin-bottom: 0;
}

.main-page-preview {
    flex: 0 0 10%;
    padding-bottom: 20px;
}

.loading-message {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  color: #888;
}
</style>
