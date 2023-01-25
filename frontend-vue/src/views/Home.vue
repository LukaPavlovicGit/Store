<template>
  <div className="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg1="Welcome to Vue.js App" msg2="This app displays articles and its comments!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>