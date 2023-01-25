<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item v-if="token" to="/purchase">Cart</b-nav-item>
          <b-nav-item-dropdown text="My account" v-if="token">
            <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
            <b-dropdown-item>My purchases</b-dropdown-item>
            <b-dropdown-item>My comments</b-dropdown-item>
            <b-dropdown-item>My vouchers</b-dropdown-item>
            <b-dropdown-item>My reclamations</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="token" to="/purchase">My purchases</b-nav-item>
          <b-nav-item to="/articles">Articles</b-nav-item >
          <b-nav-item v-if="!token" to="/register">Register</b-nav-item>
          <b-nav-item v-if="!token" to="/login">Log In</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      user_id: null,
      searchQuery: ''
    }
  },

  computed: {
    ...mapState([
      'token',
      'articles'
    ]),
  },

  mounted() {
    this.fetchArticles();

    if (localStorage.token) {
      this.setToken(localStorage.token);
    }
  },

  methods: {
    ...mapActions([
      'fetchArticles'
    ]),

    ...mapMutations([
      'removeToken',
      'setToken'
    ]),

    logout() {
      this.removeToken();
    },

  },

}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 10px
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
