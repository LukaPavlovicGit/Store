<template>
  <div class="container">
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group label="First name:" label-for="firstName">
        <b-form-input id="firstName" v-model="form.first_name" type="text" placeholder="First name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Last name:" label-for="lastName">
        <b-form-input id="lastName" v-model="form.last_name" type="text" placeholder="Last name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Address:" label-for="address">
        <b-form-input id="address" v-model="form.address" type="text" placeholder="address" required></b-form-input>
      </b-form-group>
      <b-form-group label="Username:" label-for="username">
        <b-form-input id="username" v-model="form.username" type="text" placeholder="username" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="text" placeholder="password" required></b-form-input>
      </b-form-group>
      <b-form-group label="Phone:" label-for="phone">
        <b-form-input id="phone" v-model="form.phone_number" type="text" placeholder="phone" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-email" label="Email address:" label-for="input-email" description="We'll never share your email with anyone else.">
        <b-form-input id="input-email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Register</b-button>

    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "Register",

  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        address: "",
        username: "",
        password: "",
        phone_number: "",
        email: ""
      },
      show: true
    }
  },

  methods: {
    ...mapActions([
      'register'
    ]),

    onSubmit(e) {
      e.preventDefault();

      this.register(this.form);
      this.$router.push({ name: 'Home' });
    }
  }
}
</script>

<style scoped>

</style>