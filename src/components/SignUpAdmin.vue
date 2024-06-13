<!-- <template>
    <img class="logo" src="https://picsum.photos/200/300?grayscale">
    <h1>Sign Up</h1>
    <div class ="register">
        <input type="text" v-model="name" placeholder="Enter Name" />
        <input type="email" v-model="email" placeholder="Enter Email" />
        <input type="password" v-model="password" placeholder="Enter Password" />
        <button v-on:click="signUp"> Sign Up </button>
        <p>
            <RouterLink to="/login">Login</RouterLink>
        </p>
    </div>
</template> -->

<script setup>
import {onMounted, ref} from 'vue'
import { useRegisterStore } from '../stores/register';
import SkeletonLoader from './SkeletonLoader.vue';

const handleRegister = useRegisterStore()
const isLoading = ref(true)

const formRegister = ref({
    username:null,
    email:null,
    password:null,
    passwordConfirmation:null,
    phoneNumber:null
})

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
    <div v-else class="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 class="text-xl font-bold mb-6">Register</h1>
            <form @submit.prevent="handleRegister.handleRegisterAdmin(formRegister)">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="name" v-model="formRegister.username" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" v-model="formRegister.email" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                    <input type="text" v-model="formRegister.phoneNumber" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" v-model="formRegister.password" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input type="password" v-model="formRegister.passwordConfirmation" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="flex items-center justify-between">
                    <button v-on:click="signUp"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">Register</button>
                    <router-link to="/"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Back to
                        home</router-link>

                </div>
            </form>
        </div>
    </div>
</template>
<!-- 
<script>
import axios from 'axios'
import Home from '../views/Home.vue';
import { useRegisterStore } from '../stores/register';

export default {
    name: 'SignUp',
    data() {
        return {
            name : '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    },
    methods: {
        async signUp() {
            // console.warn("signup",this.name, this.email, this.password)
            let result = await axios.post("http://localhost:3000/user", {
                name: this.name,
                email: this.email,
                password: this.password,
                name: this.confirmPasswordpassword
            });

            console.warn(result);
            if (result.status == 201) {
                alert("sign-up done");
                localStorage.setItem("user-info", JSON.stringify(result.data))
                this.$router.push({ name: 'Home' })
            }

        }
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            this.$router.push({ name: 'Home' })
        }
    },
    register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Registration attempt with email: ${this.email}`);
      // Perform registration logic
    }
}
</script> -->
