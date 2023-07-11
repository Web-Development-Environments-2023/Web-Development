<template>
    <b-modal v-model="modalVisible" title="Create Recipe" @hidden="$emit('close')" hide-footer>
        <form @submit.prevent="submitForm">
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

            <b-button type="submit" variant="primary">Create Recipe</b-button>
        </form>
        <div v-if="errorMsg" class="alert">
            <h2>Error!</h2>
            <p>{{ errorMsg }}</p>
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
            errorMsg: null,
        };
    },
    methods: {
        async submitForm() {
            try {
                const success = await this.createRecipe();
                if (success) {
                    this.modalVisible = false; // Close the modal on success
                }
            } catch (error) {
                console.error('Error logging recipe ID:', error);
                this.errorMsg = error.response.data.message + ".";
            }
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

            return this.axios
                .post(`${state.server_domain}/users/recipe_creation`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    console.log('Recipe ID logged successfully:', response.data);
                    return true;
                })
                .catch(error => {
                    throw error;
                });
        },
        resetError() {
            this.errorMsg = null; // Reset the error message
        },
    },
};
</script>
  

<style scoped>
.modal-content {
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.checkbox-label {
    margin-right: 10px;
}

textarea {
    width: 100%;
    height: 150px;
    resize: vertical;
    margin-bottom: 10px;
}

.alert {
    margin-top: 20px;
    padding: 10px;
    background-color: #f8d7da;
    color: #721c24;
}

.alert h2 {
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 18px;
}

.alert p {
    margin: 0;
}

.alert button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    cursor: pointer;
}
</style>
