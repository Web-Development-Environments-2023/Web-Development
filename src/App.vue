<template>
  <div id="app">
    <nav style="background-color: #f0f0f0; padding: 10px; display: flex; justify-content: space-between;">
      <div style="display: flex;">
        <router-link :to="{ name: 'main' }" style="text-decoration: none; color: #333; margin-right: 10px;">Vue Recipes</router-link>
        <router-link :to="{ name: 'search' }" style="text-decoration: none; color: #333; margin-right: 10px;">Search</router-link>
      </div>
      <div style="display: flex;">
        <span v-if="!$root.store.username">
          <router-link :to="{ name: 'register' }" style="text-decoration: none; color: #333; margin-right: 10px;">Register</router-link>
          <router-link :to="{ name: 'login' }" style="text-decoration: none; color: #333; margin-right: 10px;">Login</router-link>
        </span>
        <span v-else>
          <span style="margin-right: 10px;">{{ $root.store.username }}</span>
          <button @click="logout" style="background-color: #f44336; color: white; border: none; padding: 5px 10px; border-radius: 4px;">Logout</button>
        </span>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
