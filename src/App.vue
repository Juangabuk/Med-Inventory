<template>
  <SkeletonLoader v-if="isLoading" />
  <div class="flex gap-2 bg-slate-50 text-slate-950 w-screen">
    <Sidebar v-if="showSidebarAndHeader" />
    <div :class="mainContentClass">
      <Header v-if="showSidebarAndHeader" />
      <RouterView />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';
import SkeletonLoader from './components/SkeletonLoader.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    Header,
    SkeletonLoader
  },
  data() {
    return {
      isLoading: true,
      items: []
    };
  },

  mounted() {
    // Simulate data fetching
    setTimeout(() => {
      this.items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
      this.isLoading = false;
    }, 3000); // Replace with your actual data fetching logic
  },
  
  setup() {
    const route = useRoute();
    const showSidebarAndHeader = computed(() => {
      return route.path !== '/sign-up' && route.path !== '/login' && route.path !== '/login-admin' && route.path !== '/register-admin';
    });

    const mainContentClass = computed(() => {
      return showSidebarAndHeader.value
        ? 'w-full h-screen overflow-y-scroll'
        : 'w-screen h-screen overflow-y-scroll';
    });

    return {
      showSidebarAndHeader,
      mainContentClass
    };
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400&display=swap");

:root {
  font-family: Montserrat;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  padding: 0;
}

#app {
  padding: 0;
  margin: 0;
}

input {
  background-color: #ffffff;
}
</style>
