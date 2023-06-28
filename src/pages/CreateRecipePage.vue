<template>
  <b-modal v-model="modalVisible" title="Create Recipe">
    <form @submit.prevent="createRecipe">
      <b-form-group label="Image URL:" label-for="image-input">
        <b-form-input id="image-input" v-model="recipe.image" required></b-form-input>
      </b-form-group>

      <b-form-group label="Recipe Name:" label-for="name-input">
        <b-form-input id="name-input" v-model="recipe.name" required></b-form-input>
      </b-form-group>

      <b-form-group label="Ready in Minutes:" label-for="readyInMinutes-input">
        <b-form-input id="readyInMinutes-input" type="number" v-model="recipe.readyInMinutes" required></b-form-input>
      </b-form-group>

      <p>Vegan <input type="checkbox" id="vegan" v-model="recipe.vegan" /></p>
      <p>Gluten-free <input type="checkbox" id="glutenfree" v-model="recipe.glutenfree" /></p>

      <p>Ingredients: </p>
      <textarea v-model="recipe.ingredients" placeholder="Add ingredients here."></textarea>
      <p>Preparation Steps: </p>
      <textarea v-model="recipe.preparationSteps" placeholder="Add preparation steps here here."></textarea>

      <b-form-group label="Number of Servings" label-for="numOfServings-input">
        <b-form-input id="numOfServings-input" type="number" v-model="recipe.numOfServings" required></b-form-input>
      </b-form-group>

      <b-button type="submit">Create Recipe</b-button>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: "CreateRecipePage",
  data() {
    return {
      modalVisible: true, // Show the modal by default
      recipe: {
        image: "",
        name: "",
        readyInMinutes: null,
        vegan: false,
        glutenfree: false,
        ingredients: "",
        preparationSteps: "",
        numOfServings: null,
      },
    };
  },
  methods: {
    createRecipe() {
      // access the recipe data from this.recipe
      // and send it to the server for recipe creation
      console.log(this.recipe);
    },
  },
};
</script>

<style scoped>
/* placeholder */
</style>
