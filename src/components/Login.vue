<template>
    <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
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
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">Login</button>
                    <router-link to="/sign-up"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">REGISTER</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
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
</script>

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