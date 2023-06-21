<template>
    <div class="container">
        <span>
            <h1 class="title">Main Page</h1>
            <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />
        </span>
        <span v-if="!$root.store.username">
            <router-link to="/login" tag="button">Login to view last viewed recipe history.</router-link>
        </span>
        <span v-else>
            <RecipePreviewList title="Last Viewed Recipes" :class="{
                RandomRecipes: true,
                center: true
            }" disabled></RecipePreviewList>
        </span>
    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
    components: {
        RecipePreviewList
    }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
    margin: 10px 0 10px;
}

.blur {
    -webkit-filter: blur(5px);
    /* Safari 6.0 - 9.0 */
    filter: blur(2px);
}

::v-deep .blur .recipe-preview {
    pointer-events: none;
    cursor: default;
}
</style>
