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
html,
body,
#app {
  font-family: Montserrat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  margin-top: 60px;
  color: #212f3d;
}

* {
  box-sizing: inherit;
}

@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}

.logo {
  width: 100px;
}

.register input,
.login input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}

.register button,
.login button {
  width: 320px;
  height: 40px;
  border: 1px solid skyblue;
  background: skyblue;
  color: #fff;
  cursor: pointer;
}
</style>
