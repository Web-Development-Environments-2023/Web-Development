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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.recipe-preview-container {
  flex: 0 0 100%;
  margin-bottom: 20px;
}

.recipe-preview-container:last-child {
  margin-bottom: 0;
}

.loading-message {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  color: #888;
}
</style>
