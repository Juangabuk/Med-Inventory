<template>
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
</template>

<script>
import axios from 'axios'
import Home from './Home.vue';

export default {
    name: 'SignUp',
    data()
    {
        return {
            name: '',
            email: '',
            password:''
        }
    },
    methods:{
        async signUp()
        {
            // console.warn("signup",this.name, this.email, this.password)
            let result = await axios.post("http://localhost:3000/user",{
                email:this.email,
                password:this.password,
                name:this.name
            });

            console.warn(result);
            if(result.status==201)
            {
                alert("sign-up done");
                localStorage.setItem("user-info", JSON.stringify(result.data))
                this.$router.push({name:'Home'})
            }
            
        }
    },
    mounted()
    {
        let user= localStorage.getItem('user-info');
        if(user)
        {
            this.$router.push({name:'Home'})
        }
    }
}
</script>

