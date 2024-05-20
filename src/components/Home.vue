<template>
    <Header></Header>
    <div class="home-container">
        <h1>
            Med Inventory
        </h1>
    </div>

</template>

<script>
import Header from './Header.vue';
export default {
    name: 'Home',
    components: {
        Header
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({ name: 'SignUp' });
        }
    }
}


</script>

<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* Align items to the start of the container */
    padding: 20px;
    /* Optional: Add some padding */
    height: 100vh;
    /* Make the container take the full height of the viewport */
}

h1 {
    margin: 0;
    /* Remove default margin */
    padding: 0;
    /* Remove default padding */
}
</style>
