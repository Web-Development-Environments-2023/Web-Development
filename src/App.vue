<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">RecipeWebsite</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-navbar-nav class="align-items-center">
                <b-nav-item :to="{ name: 'main' }">HOME</b-nav-item>
                <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
                <b-nav-item>
                    <span v-if="!$root.store.username">
  <span class="align-items-center">
    Guest:
    <b-nav-item class="d-inline-block align-top" :to="{ name: 'register' }">Register</b-nav-item>|
    <b-nav-item class="d-inline-block align-top" :to="{ name: 'login' }">Login</b-nav-item>
  </span>
</span>

                    <span v-else>
                        {{ $root.store.username }}: <b-button @click="logout" variant="link">Logout</b-button>
                        <!-- TODO: Change design. -->
                    </span>
                </b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav>
                <b-nav-item-dropdown right>
                    <template #button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item> <!--TODO: Make button do something -->
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item> <!--TODO: Make button do something -->
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