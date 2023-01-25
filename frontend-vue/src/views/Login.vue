<template>
  <div id="app">
    <b-container>
      <h3>Log In</h3>
      <b-form @submit="onSubmit">
        <b-form-group label="Email:" label-for="email">
          <b-form-input id="email" v-model="form.email" type="text" placeholder="email" required></b-form-input>
        </b-form-group>

        <b-form-group label="Password:" label-for="password">
          <b-form-input id="password" v-model="form.password" type="password" placeholder="Password" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "Login",

  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions([
      'login'
    ]),

    onSubmit(e) {
      e.preventDefault();

      this.login(this.form);
      this.$router.push({ name: 'Articles' });
    }
  }
}
</script>

<style scoped>

</style>