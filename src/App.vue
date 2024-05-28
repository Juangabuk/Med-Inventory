<template>
  <RouterView />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import SignUp from './components/SignUp.vue';
import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    SignUp,
    Headers,
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400&display=swap");
#app {
  font-family: Montserrat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  margin-top: 60px;
  color: #212f3d;
}
</style>
