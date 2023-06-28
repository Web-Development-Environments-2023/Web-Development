<template>
    <div class="favorite-recipes">
      <div class="recipe-list">
        <div class="recipe-preview-container" v-for="recipe in favorite" :key="recipe.name">
          <RecipePreview :recipe="recipe"></RecipePreview>
        </div>
        <div v-if="favorite.length === 0" class="no-recipes-message">No favorite recipes found.</div>
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
      };
    },
    methods: {
      async fetchFavoriteRecipes() {
        await this.axios
          .get(state.server_domain + "/users/favorites")
          .then((response) => {
            this.favorite = response.data;
          })
          .catch((error) => {
            console.error(error);
            this.favorite = [];
          });
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
  
  .recipe-preview-container {
    flex: 0 0 100%;
    margin-bottom: 20px;
  }
  
  .recipe-preview-container:last-child {
    margin-bottom: 0;
  }
  
  .no-recipes-message {
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
    color: #888;
  }
  </style>
  