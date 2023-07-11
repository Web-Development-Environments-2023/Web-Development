<template>
    <b-card v-if="recipe" class="RecipeDetails">
        <template #header>
            <h1>{{ recipe.title }}</h1>
        </template>
        <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
        <div class="fav-to-the-right">
            <button v-if="!$root.store.username" class="fav-no-logged-in">Log in to add to favs</button>
            <button v-else-if="!isFavorite" class="add-to-favorite" @click="addToFavorites">Add to favorite</button>
            <button v-else class="in-favorites">In favorites</button>
        </div>
        <div class="fav-to-the-right">
            <span v-if="!isWatched"></span>
            <span v-else>👀</span>
        </div>
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
            recipe: null,
            isFavorite: false,
            isWatched: false,
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
                id,
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
                id,
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
            this.isFavorite = await this.checkFavorite();
            this.isWatched = await this.checkWatched();
        } catch (error) {
            console.log(error);
        }
    },


    methods: {
        addToFavorites() {
            const payload = {
                recipeId: this.recipe.id
            };
            this.axios
                .post(`${state.server_domain}/users/favorites`, payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => { this.isFavorite = true; })
                .catch(error => { console.error('Error logging recipe ID:', error); })
        },
        async checkFavorite() {
            try {
                const response = await this.axios.get(state.server_domain + "/users/favoritesid");
                const favoritesid = response.data;
                return favoritesid.some(favorite => favorite === this.recipe.id);
            }
            catch (error) {
                console.error(error);
                return false;
            }
        },
        async checkWatched() {
            try {
                const response = await this.axios.get(state.server_domain + "/users/watchedid");
                const watchedid = response.data;
                return watchedid.some(watched => watched === this.recipe.id);
            }
            catch (error) {
                console.error(error);
                return false;
            }
        },
    }
};
</script>


<style scoped>
.RecipeDetails {
    max-width: 700px;
    margin: 20px auto;
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

.add-to-favorite {
    color: red;
    width: 100%;
}

.fav-no-logged-in {
    color: red;
    background-color: lightgray;
    cursor: not-allowed;
}

.in-favorites {
    color: red;
    background-color: lightgray;
    cursor: not-allowed;
}

.fav-to-the-right {
    display: flex;
    justify-content: flex-end;
}
</style>
