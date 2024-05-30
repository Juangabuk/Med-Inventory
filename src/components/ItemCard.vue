<script setup>
import { useRouter } from 'vue-router';
import { backendUrl } from '../varConstants';
import { ref } from 'vue';
const item  = defineProps(['item'])


const imageUrl = ref(backendUrl +'/static/'+ item.item.gambar)

</script>

<template>
     <div class="product-card">
        <img :src="imageUrl" :alt="item.item.namaBarang" class="product-image">
        <div class="product-info">
            <h3>{{ item.item.namaBarang }}</h3>
            <p>Kategori: {{ item.item.kategori }}</p>
            <p>Stok: {{ item.item.jumlah }}</p>
            <button class="detail-button">Detail</button>
            <button class="add-to-cart-button">Add to Cart</button>
        </div>
    </div>
</template>
   

<style>

.product-card {
    width: 200px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}

.product-image {
    width: 100%;
    height: auto;
}

.detail-button,
.add-to-cart-button {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
}

.detail-button:hover,
.add-to-cart-button:hover {
    background-color: #0056b3;
}


</style>