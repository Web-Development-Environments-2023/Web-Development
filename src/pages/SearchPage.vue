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
                    <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
                </select>
                <select v-model="selectedDiet" @change="applyFilters">
                    <option value="">No Diet Filter</option>
                    <option v-for="diet in diets" :key="diet" :value="diet">{{ diet }}</option>
                </select>
                <select v-model="selectedIntolerance" @change="applyFilters">
                    <option value="">No Intolerance Filter</option>
                    <option v-for="intolerance in intolerances" :key="intolerance" :value="intolerance">{{ intolerance }}
                    </option>
                </select>
            </div>
        </div>
        <div v-if="searchResults.length > 0">
            <h2>Search Results</h2>
            <ul>
                <li v-for="result in searchResults" :key="result.id">{{ result.title }}</li>
            </ul>
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
export default {
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
            cuisines: ["African", "American", "British", "Cajun", "Caribbean", "Chinese", "European", "French", "German"],
            diets: ["Gluten Free", "Ketogenic", "Vegetarian", "Vegan", "Pescetarian", "Paleo"],
            intolerances: ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"]
        };
    },
    methods: {
        saveSearchQuery() {
            localStorage.setItem("previousSearch", this.searchQuery);
        },
        searchRecipes() {
            this.isSearching = true;

            // Prepare the search parameters
            const searchParams = {
                searchQuery: this.searchQuery,
                resultsCount: this.resultsCount,
                selectedCuisine: this.selectedCuisine,
                selectedDiet: this.selectedDiet,
                selectedIntolerance: this.selectedIntolerance
            };

            // Perform the API call or fetch request using the search parameters
            fetch(state.server_domain + "/recipes/search", {
                method: 'POST',
                body: JSON.stringify(searchParams),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.searchResults = data;
                    console.log("Recived data."); // TODO:
                })
                .catch(error => {
                    console.error('Error searching recipes:', error);
                })
                .finally(() => {
                    this.isSearching = false;
                });
        },
        applyFilters() {
            this.searchRecipes();
        }
    },
    mounted() {
        if (this.previousSearch) {
            this.searchQuery = this.previousSearch;
            this.searchRecipes();
        }
    }
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

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 5px;
}
</style>
