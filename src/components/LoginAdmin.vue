<script setup>
import { useLoginStore } from '../stores/login';
import { onMounted, ref } from 'vue';
import SkeletonLoader from './SkeletonLoader.vue';

const handleLogin = useLoginStore();
const isLoading = ref(true)

const formLogin = ref({
  email: null,
  password: null,
});

onMounted(()=>{
    setTimeout(()=>{
        isLoading.value = false
    },750)  
})
</script>

<template>
     <div v-if="isLoading">
        <SkeletonLoader />
    </div>
  <div v-else class="min-h-screen grid grid-cols-2 bg-gray-100">
    <div class="w-full bg-white flex justify-center flex-col text-left px-24">
      <h1 class="text-5xl text-left text-gray-900">
        Medi-Inventory
      </h1>
      <p class="text-gray-600 my-4">
        Inventory Management System
      </p>
      <img src="../assets/logomediinv.webp" alt="Medi-Inventory Logo" class="self-center my-4 logo-img">
      <p class="text-gray-600 mt-12">
        One Application that keeps track of your organization's assets
      </p>
    </div>
    <div class="w-full h-full flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-96 text-left">
        <h1 class="text-xl font-bold mb-6 text-center">Login</h1>
        <form @submit.prevent="handleLogin.handleLoginAdmin(formLogin)">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" v-model="formLogin.email" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" v-model="formLogin.password" required
                   class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          </div>
          <div class="grid grid-cols-3">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">Login
            </button>
            <!-- <div class="flex justify-end items-center">
              <router-link to="/sign-up"
                           class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">REGISTER</router-link>
            </div> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import Home from '../views/Home.vue';
import axios from 'axios';
import { reactive } from 'vue';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      let result = await axios.get(
        `http://localhost:3000/user?email=${this.email}&password=${this.password}`
      )
      if (result.status == 200 && result.data.length > 0) {
        alert("sign-up done");
        localStorage.setItem("user-info", JSON.stringify(result.data[0]))
        this.$router.push({ name: 'Home' })
      }
      console.warn(result)
    }
  }
};
</script> -->

<style>
body {
  font-family: 'Montserrat', sans-serif;
}

input:focus {
  outline: 2px solid #4C51BF;
  box-shadow: 0 0 5px rgba(76, 81, 191, 0.5);
}

.logo-img {
  width: 250px;
  height: auto;
}
</style>
