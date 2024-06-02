<script setup>
import { useRouter } from 'vue-router';
import { backendUrl } from '../varConstants';
import { ref } from 'vue';
import ModalDetail from './ModalDetail.vue';
import { useItemStore } from '../stores/items';

const item = defineProps(['item'])

const itemStore = useItemStore();
const imageUrl = ref(backendUrl + '/static/' + item.item.gambar)

const isModalVisible = ref(null)
const singleItemDetail = ref(null)

async function showModal(id) {
    await itemStore.getDetailItem(id)
    singleItemDetail.value = itemStore.detailItem
    isModalVisible.value = true;
}
function closeModal() {
    isModalVisible.value = false;
}



</script>

<template>
    <div class="product-card" >
            <img :src="imageUrl" :alt="item.item.namaBarang" class="product-image">
            <div class="product-info">
                <h3>{{ item.item.namaBarang }}</h3>
                <p>Kategori: {{ item.item.kategori }}</p>
                <p>Stok: {{ item.item.jumlah }}</p>
                <button class="detail-button" @click="showModal(item.item.id)">Detail</button>
                <button v-show="$route.name =='Home'" class="add-to-cart-button">Add to Cart</button>
                <button class="edit-button" v-show="$route.name == 'ProductManagement'">Edit Item</button>
                <button class="delete-button" v-show="$route.name == 'ProductManagement'">Delete Item</button>
            </div>
        <ModalDetail v-if="isModalVisible" @close="closeModal" />
    </div>
</template>


<style scoped>
.product-grid {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
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

.edit-button{
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #f0ae12;
    color: white;
    cursor: pointer;
}

.edit-button:hover {
    background-color: #f08812;
}

.delete-button{
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #f02112;
    color: white;
    cursor: pointer;
}

.delete-button:hover{
    background-color: #f01212;
}
</style>