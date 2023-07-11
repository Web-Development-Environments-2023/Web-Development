<template>
    <b-modal v-model="modalVisible" title="Create Recipe" @hidden="$emit('close')">
        <form @submit="submitForm">
            <b-form-group label="Image URL:" label-for="image-input">
                <b-form-input id="image-input" v-model="recipe.image" required></b-form-input>
            </b-form-group>

            <b-form-group label="Recipe Name:" label-for="name-input">
                <b-form-input id="name-input" v-model="recipe.name" required></b-form-input>
            </b-form-group>

            <b-form-group label="Ready in Minutes:" label-for="readyInMinutes-input">
                <b-form-input id="readyInMinutes-input" type="number" v-model="recipe.readyInMinutes"
                    required></b-form-input>
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
        <div v-if="errorMsg" class="alert">
            <h2>Error!</h2>
            <p>{{ errorMessage }}</p>
            <button @click="resetError">Close</button>
        </div>
    </b-modal>
</template>

<script>
import { state } from "/src/store.js";

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
            errorMsg: null
        };
    },
    methods: {
        submitForm(){
            this.createRecipe();
            this,this.modalVisible = false;
        },
        createRecipe() {
            const payload = {
                image: this.recipe.image,
                name: this.recipe.name,
                readyInMinutes: this.recipe.readyInMinutes,
                vegan: this.recipe.vegan,
                glutenFree: this.recipe.glutenfree, // Updated property name
                ingredients: this.recipe.ingredients,
                preperation_steps: this.recipe.preparationSteps, // Updated property name
                num_of_servings: this.recipe.numOfServings, // Updated property name
            };

            this.axios
                .post(`${state.server_domain}/users/recipe_creation`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    /* console.log('Recipe ID logged successfully:', response.data); */
                })
                .catch(error => {
                    console.error('Error logging recipe ID:', error);
                    this.errorMsg = error.message;
                })
        },
        resetError() {
            this.errorMsg = null; // Reset the error message
        }
    },
};
</script>

<style scoped>
/* placeholder */
</style>
