<template>
  <div>
    <b-card v-for="recipe in recipes" :key="recipe.id" class="RecipeDetails">
      <template #header>
        <h1>{{ recipe.title }}</h1>
      </template>
      <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
      <b-card-text>
        <h3>This family recipe belongs to {{ recipe.belongs_to }} and is prepared on {{ recipe.prepared_in }}!</h3>
        <p>Ready in {{ recipe.readyInMinutes }} minutes.</p>
        <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}.</p>
        <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}.</p>
        <p>Number of Servings: {{ recipe.num_of_servings }}.</p>
      </b-card-text>
      <b-card-text>
        <h3>Ingredients:</h3>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">
            {{ ingredient }}
          </li>
        </ul>
      </b-card-text>
      <b-card-text>
        <h3>Preparation Steps:</h3>
        <p>{{ recipe.preperation_steps }}</p>
      </b-card-text>
    </b-card>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="loading">Error fetching recipes.</div>
    <div v-else-if="recipes.length === 0">You have no family recipes stored.</div>
  </div>
</template>
  
  
<script>
import { state } from "/src/store.js";

export default {
  data() {
    return {
      recipes: [],
      loading: true,
      error: false,
    };
  },
  async created() {
    try {
      const response = await this.axios.get(state.server_domain + "/users/familyrecipes");
      if (response.status === 200) {
        this.recipes = response.data;
      } else {
        this.error = true;
      }
    } catch (error) {
      console.log(error);
      this.error = true;
    } finally {
      this.loading = false;
    }
  },
};
</script>
  
<style scoped>
.RecipeDetails {
  max-width: 700px;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.RecipeDetails h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333333;
}

.recipe-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.RecipeDetails p {
  margin-bottom: 10px;
  color: #666666;
}

.RecipeDetails ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.RecipeDetails li {
  margin-bottom: 5px;
  color: #444444;
}

.RecipeDetails h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333333;
}

.loading {
  text-align: center;
  font-size: 18px;
  padding: 20px;
  background-color: #ff0000;
  color: #ffffff;
}

.no-recipes {
  text-align: center;
  font-size: 32px;
  padding: 20px;
  color: #666666;
}
</style>
