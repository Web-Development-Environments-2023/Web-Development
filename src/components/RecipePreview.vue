<template>
  <div class="RecipePreview">
    <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
      <b-card :img-src="recipe.image" img-alt="Image" img-top tag="article" class="mb-2">
        <div class="recipe-details">
          <h3 class="recipe-title">{{ recipe.title }}</h3>
          <p>Ready in {{ recipe.readyInMinutes }} minutes.</p>
          <p>Popularity: {{ recipe.aggregateLikes }}.</p>
          <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}.</p>
          <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}.</p>
        </div>
      </b-card>
    </router-link>
  </div>
</template>

<script>
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
      this.$router.push({ name: 'recipe', params: { recipeId: this.recipe.id } });
    }
  }
};
</script>

<style>
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
