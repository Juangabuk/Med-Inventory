<script setup>
import { useLoginStore } from '../stores/login';
import {ref} from 'vue'

const handleLogin = useLoginStore()

const formLogin = ref({
    email:null,
    password:null
})

</script>


<template>
    <div class="min-h-screen grid grid-cols-2 bg-gray-100">
        <div class="w-full bg-white flex justify-center flex-col text-left px-24">
            <h1 class="text-5xl text-left text-gray-900">
                Med-Inventory
            </h1>
            <p class="text-gray-600 my-4">
                Inventory Management System
            </p>
            <p class="text-gray-600 mt-12">
                One Application that keep tracks of your organization assets
            </p>
        </div>
        <div class="w-full h-full flex justify-center items-center">
            <div class="bg-white p-8 rounded-lg shadow-md w-96 text-left">
                <h1 class="text-xl font-bold mb-6 text-center">Login</h1>
                <form @submit.prevent="login">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" v-model="email" required
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" v-model="password" required
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="grid grid-cols-3">
                        <div></div>
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">Login</button>
                        <div class="flex justify-end items-center">
                            <router-link to="/sign-up"
                                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">REGISTER</router-link>

                        </div>
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
    /* Tailwind's blue-700 color */
    box-shadow: 0 0 5px rgba(76, 81, 191, 0.5);
    /* Slight blue shadow */
}
</style>