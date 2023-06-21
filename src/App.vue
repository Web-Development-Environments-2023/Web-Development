<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">RecipeWebsite</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-navbar-nav class="align-items-center">
                <b-nav-item :to="{ name: 'main' }">Main</b-nav-item>
                <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
                <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
            </b-navbar-nav>


            <b-navbar-nav v-if="!$root.store.username">
                <b-nav-item-dropdown right>
                    <template #button-content>
                        <em>Guest</em>
                    </template>
                    <b-dropdown-item :to="{ name: 'login' }">Log In</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'register' }">Register</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

            <b-navbar-nav v-else>
                <b-nav-item-dropdown right>
                    <template #button-content>
                        <em>{{ $root.store.username }}</em>
                    </template>
                    <b-dropdown-item :to="{ name: 'favorites' }">Favorites</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'created' }">Created</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'familyrecipes' }">Family Recipes</b-dropdown-item>
                    <b-dropdown-item :to="{ name: 'create' }">Create a Recipe</b-dropdown-item>
                    <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
        <router-view />
    </div>
</template>
  
<script>
export default {
    name: "App",
    methods: {
        logout() {
            this.$root.store.logout();
            this.$root.toast("Logout", "User logged out successfully", "success");

            this.$router.push("/").catch(() => {
                this.$forceUpdate();
            });
        },
    },
};
</script>
  
<style lang="scss">
@import "@/scss/form-style.scss";

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
}

.navbar-nav .nav-link {
    font-weight: bold;
    color: #2c3e50;
    display: inline-block;
    margin: 0 10px;
    vertical-align: middle;
}

.navbar-nav>li {
    display: flex;
    align-items: center;
}

.navbar-nav .align-items-center {
    display: flex;
    align-items: center;
}

.align-top {
    margin-bottom: 0px;
}
</style>
  