<template>
  <b-card v-if="recipe" class="RecipeDetails">
    <template #header>
      <h1>{{ recipe.title }}</h1>
    </template>
    <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
    <b-card-text>
      <p>Ready in {{ recipe.readyInMinutes }} minutes.</p>
      <p>Popularity: {{ recipe.popularity }}.</p>
      <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}.</p>
      <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}.</p>
      <p>Number of Servings: {{ recipe.num_of_servings }}.</p>
    </b-card-text>
    <b-card-text>
      <h3>Ingredients</h3>
      <ul>
        <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
          {{ ingredient.original }}
        </li>
      </ul>
    </b-card-text>
    <b-card-text>
      <h3>Preparation Steps</h3>
      <div v-html="recipe.preperation_steps"></div>
    </b-card-text>
  </b-card>
  <div v-else>Loading...</div>
</template>

<script>
import { state } from "/src/store.js";

export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      try {
        const recipeId = this.$route.params.recipeId;
        response = await this.axios.get(
          state.server_domain + `/recipes/${recipeId}`
        );

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        image,
        title,
        readyInMinutes,
        popularity,
        vegan,
        glutenFree,
        ingredients,
        preperation_steps,
        num_of_servings
      } = response.data[0];

      this.recipe = {
        image,
        title,
        readyInMinutes,
        popularity,
        vegan,
        glutenFree,
        ingredients,
        preperation_steps,
        num_of_servings
      };
    } catch (error) {
      console.log(error);
    }
  }
};
</script>


<style scoped>
.RecipeDetails {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.RecipeDetails h1 {
  font-size: 28px;
  margin-bottom: 20px;
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
}

.RecipeDetails ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.RecipeDetails li {
  margin-bottom: 5px;
}

.RecipeDetails h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.RecipeDetails ol {
  padding-left: 20px;
}

.RecipeDetails ol li {
  margin-bottom: 5px;
}

.loading {
  text-align: center;
  font-size: 18px;
  padding: 20px;
}
</style>
