<template>
    <img class="logo" src="https://picsum.photos/200/300?grayscale">
    <h1>Login</h1>
    <div class="login">
        <input type="email" v-model="email" placeholder="Enter Email" />
        <input type="password" v-model="password" placeholder="Enter Password" />
        <button v-on:click="login"> Login </button>
        <p>
            <RouterLink to="/sign-up">Sign Up</RouterLink>
        </p>
    </div>
</template>

<script>
import Home from './Home.vue';
import axios from 'axios';
import { reactive } from 'vue';
export default {
    name: 'Login',
    data()
    {
        return {
            email:'',
            password:''
        }
    },
    methods:{
        async login()
        {
            let result = await axios.get(
                `http://localhost:3000/user?email=${this.email}&password=${this.password}`
            )
            if(result.status==200 && result.data.length>0)
            {
                alert("sign-up done");
                localStorage.setItem("user-info", JSON.stringify(result.data[0]))
                this.$router.push({name:'Home'})
            }
            console.warn(result)
        }
    }
};
</script>