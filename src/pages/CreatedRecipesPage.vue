<template>
  <div class="created-recipes">
    <div class="recipe-list">
      <div class="recipe-preview-container" v-for="recipe in created" :key="recipe.name">
        <RecipePreview :recipe="recipe"></RecipePreview>
      </div>
      <div v-if="loading" class="loading-message">Loading created recipes...</div>
      <div v-if="created.length === 0 && !loading" class="no-recipes-message">No created recipes found.</div>
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
      created: [], // Placeholder for created recipes data
      loading: false, // Flag to indicate if data is being loaded
    };
  },
  methods: {
    async fetchCreatedRecipes() {
      try {
        this.loading = true; // Set loading flag to true before fetching data
        const response = await this.axios.get(state.server_domain + "/users/created_recipes");
        this.created = response.data;
      } catch (error) {
        console.error(error);
        this.created = [];
      } finally {
        this.loading = false; // Set loading flag to false after data is fetched
      }
    },
  },
  mounted() {
    // Fetch initial data on page load
    this.fetchCreatedRecipes(); // Fetch created recipes
  },
};
</script>

<style>
.created-recipes {
  margin-top: 20px;
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.recipe-preview-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recipe-preview-container:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.recipe-preview-container img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-preview-details {
  padding: 20px;
}

.recipe-preview-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.recipe-preview-description {
  font-size: 14px;
  color: #888;
}

.no-recipes-message {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  color: #888;
}
</style>
