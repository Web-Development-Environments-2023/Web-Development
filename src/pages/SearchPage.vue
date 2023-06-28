<template>
    <div>
        <h1>Recipe Search</h1>
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Search for recipes" @input="saveSearchQuery" />
            <select v-model="resultsCount">
                <option value="5">5 results</option>
                <option value="10">10 results</option>
                <option value="15">15 results</option>
            </select>
            <div class="filters-container">
                <select v-model="selectedCuisine" @change="applyFilters">
                    <option value="">No Cuisine Filter</option>
                    <option v-for="cuisine in cuisinesList" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
                </select>
                <select v-model="selectedDiet" @change="applyFilters">
                    <option value="">No Diet Filter</option>
                    <option v-for="diet in dietsList" :key="diet" :value="diet">{{ diet }}</option>
                </select>
                <select v-model="selectedIntolerance" @change="applyFilters">
                    <option value="">No Intolerance Filter</option>
                    <option v-for="intolerance in intolerancesList" :key="intolerance" :value="intolerance">
                        {{ intolerance }}
                    </option>
                </select>
            </div>
            <button @click="searchRecipes">Search</button>
        </div>
        <div v-if="searchResults.length > 0">
            <h2>Search Results</h2>
            <div v-if="searchResults.length > 0">
                <div class="recipe-list">
                    <RecipePreview v-for="result in searchResults" :key="result.recipeId" :recipe="result"></RecipePreview>
                </div>
            </div>
        </div>
        <div v-else-if="isSearching">
            <p>Loading...</p>
        </div>
        <div v-else>
            <p>No search results yet.</p>
        </div>
    </div>
</template>
  
<script>
import { state } from "/src/store.js";
import RecipePreview from "@/components/RecipePreview.vue";

export default {
    components: {
        RecipePreview
    },
    name: "SearchPage",
    data() {
        return {
            searchQuery: "",
            resultsCount: "5",
            selectedCuisine: "",
            selectedDiet: "",
            selectedIntolerance: "",
            searchResults: [],
            isSearching: false,
            previousSearch: localStorage.getItem("previousSearch") || "",
            cuisinesList: [
                "African",
                "American",
                "British",
                "Cajun",
                "Caribbean",
                "Chinese",
                "European",
                "French",
                "German",
            ],
            dietsList: [
                "Gluten Free",
                "Ketogenic",
                "Vegetarian",
                "Vegan",
                "Pescetarian",
                "Paleo",
            ],
            intolerancesList: [
                "Dairy",
                "Egg",
                "Gluten",
                "Grain",
                "Peanut",
                "Seafood",
                "Sesame",
                "Shellfish",
                "Soy",
                "Sulfite",
                "Tree Nut",
                "Wheat",
            ],
        };
    },
    methods: {
        saveSearchQuery() {
            localStorage.setItem("previousSearch", this.searchQuery);
        },
        searchRecipes() {
            this.isSearching = true;

            const searchParams = {
                Search_text: this.searchQuery,
                Num_of_results: parseInt(this.resultsCount),
                cuisines: this.selectedCuisine ? [this.selectedCuisine] : [],
                diets: this.selectedDiet ? [this.selectedDiet] : [],
                intolerances: this.selectedIntolerance ? [this.selectedIntolerance] : [],
            };

            const queryString = Object.entries(searchParams)
                .filter(([key, value]) => value !== undefined && value !== "")
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join("&");

            const url = state.server_domain + "/recipes/search?" + queryString;

            fetch(url)
                .then((response) => response.json())
                .then((data) => { this.searchResults = data; })
                .catch((error) => { console.error("Error searching recipes:", error); })
                .finally(() => { this.isSearching = false; });
        },
        applyFilters() { },
    },
    mounted() {
        if (this.previousSearch) {
            this.searchQuery = this.previousSearch;
        }
    },
};
</script>

<style>
.search-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

.filters-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.recipe-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 5px;
}
</style>