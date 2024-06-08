<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue'

const userData = JSON.parse(localStorage.getItem('user_data'))

</script>

<template>
    <main>
        <div class="container-fluid mt-5">
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="card p-4 shadow-lg">
                        <h1 class="fw-bold mb-4 text-start">Account</h1>
                        <form>
                            <div class="form-outline mb-4">
                                <label class="form-label fw-bold text-start">Email</label>
                                <input type="email" class="form-control rounded" :value="userData.email" disabled>
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label fw-bold text-start">Username</label>
                                <input type="text" class="form-control rounded" :value="userData.username" disabled>
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label fw-bold text-start">Phone Number</label>
                                <input type="text" class="form-control rounded" :value="userData.phoneNumber" disabled>
                            </div>
                            <!-- <div class="text-start">
                                <button class="btn btn-primary text-white rounded-pill" type="button">
                                    <span class="bi bi-pencil"></span>
                                    &nbsp;Edit Data
                                </button>
                            </div> -->
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.container-fluid {
    max-width: 100%;
}

.card {
    border-radius: 10px;
}

.form-outline {
    text-align: left; /* Ensure form elements are aligned left */
}

.form-outline input {
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 25px;
    color: #555;
    padding: 10px 15px;
    max-width: 400px; /* Set a max-width for the input boxes */
}

.form-label {
    display: block;
    margin-bottom: 5px;
}

.btn {
    border-radius: 25px;
    padding: 10px 20px;
}

.text-start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Aligns content to the left */
}

h1 {
    text-align: left;
    width: 100%;
    font-size: 20pt;
    font-style:normal;
}

form {
    width: 100%;
}
</style>
