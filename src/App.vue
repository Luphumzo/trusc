<template>
  <nav></nav>
  <router-view />
  <teleport to="body">
    <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      isConnected: true,
    };
  },
  mounted() {
    this.checkConnectionStatus();
  },
  methods: {
    checkConnectionStatus() {
      window.addEventListener("offline", function (e) {
        console.log(e);
        this.$snackbar.add({
          type: "warning",
          text: "You appear to be offline, that's okay, we can still do things",
        });
      });

      window.addEventListener("online", function (e) {
        console.log(e);
        this.$snackbar.add({
          type: "success",
          text: "It looks like you're online!",
        });
      });

      setTimeout(() => this.$snackbar.clear(), 2000);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  margin-bottom: 50px;
  background-color: cadetblue;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
