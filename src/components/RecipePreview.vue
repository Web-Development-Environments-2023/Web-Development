<template>
  <div class="RecipePreview">
    <a href="#" class="recipe-preview" @click="navigateToRecipe">
      <b-card :img-src="recipe.image" img-alt="Image" img-top tag="article" class="mb-2">
        <div class="recipe-details">
          <h3 class="recipe-title">{{ recipe.title }}</h3>
          <div class="fav-to-the-right">
            <button v-if="!$root.store.username" class="fav-no-logged-in">Log in to add to favs</button>
            <button v-else-if="!isFavorite" class="add-to-favorite" @click="addToFavorites">Add to favorite</button>
            <button v-else class="in-favorites">In favorites</button>
          </div>
          <div class="fav-to-the-right">
            <span v-if="!isWatched"></span>
            <span v-else>👀</span>
          </div>
          <p>Ready in {{ recipe.readyInMinutes }} minutes.</p>
          <p>Popularity: {{ recipe.popularity === undefined ? recipe.aggregateLikes : recipe.popularity }}.</p>
          <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}.</p>
          <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}.</p>
        </div>
      </b-card>
    </a>
  </div>
</template>

<script>
import { state } from "/src/store.js";

export default {
  data() {
    return {
      isFavorite: false,
      isWatched: false,
    }
  },
  name: "RecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  created: async function () {
    this.isFavorite = await this.checkFavorite();
    this.isWatched = await this.checkWatched();
  },

  methods: {
    navigateToRecipe(event) {
      if (event.target.tagName !== 'BUTTON') {
        const payload = {
          recipeId: this.recipe.id
        };
        this.axios
          .post(`${state.server_domain}/users/watched`, payload, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => { /* console.log('Recipe ID logged successfully:', response.data); */ })
          .catch(error => { console.error('Error logging recipe ID:', error); })
          .finally(() => { this.$router.push({ name: 'recipe', params: { recipeId: payload.recipeId } }); });
      }
    },
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