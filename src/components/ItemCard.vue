<script setup>
import {  useRouter } from 'vue-router';
import { backendUrl } from '../varConstants';
import { ref } from 'vue';
import ModalDetail from './ModalDetail.vue';
import { useItemStore } from '../stores/items';
import Swal from 'sweetalert2';

const item = defineProps(['item'])
const emit = defineEmits(['open'])
const router = useRouter()

const itemStore = useItemStore();
const imageUrl = ref(backendUrl + '/static/' + item.item.gambar)

const isModalVisible = ref(null)

async function showModal(id) {
    await itemStore.getDetailItem(id)
    isModalVisible.value = true;
}
function closeModal() {
    isModalVisible.value = false;
}

function addToCart(id){
    const items = JSON.parse(localStorage.getItem('items'));
    const userData = JSON.parse(localStorage.getItem('user_data'))
    if (items == null){
        const item = {
            userId: userData.id,
            itemId: id
        }
        localStorage.setItem('items',JSON.stringify([item]))

        Swal.fire({
                    title: "Success",
                    text: "Item successfully put in cart",
                    icon: "success"
                })
    } else{
        for (let item of items){
            if (item.itemId === id){
                Swal.fire({
                    title: "Oops",
                    text: "You have put this item in the cart",
                    icon: "warning"
                })
                return
            }
        }
        items.push({
                userId: userData.id,
                itemId: id
        })
        localStorage.setItem('items', JSON.stringify(items))
        Swal.fire({
                    title: "Success",
                    text: "Item successfully put in cart",
                    icon: "success"
                })
    }
}

async function deleteItem(id){
    Swal.fire({
                title: "Are you sure?",
                text: "You will delete this item",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await itemStore.deleteItem(id)
                    if (res){
                        Swal.fire({
                          title: "Success!",
                          text: "Your item has been deleted",
                          icon: "success"
                        });
                        router.go()
                    }   
                }
              });
}

function editItem(id){
    emit('open', id)
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
                <button v-show="$route.name =='Home'" class="add-to-cart-button" @click="addToCart(item.item.id)">Add to Cart</button>
                <button class="edit-button" v-show="$route.name == 'ProductManagement'" @click="editItem(item.item.id)">Edit Item</button>
                <button class="delete-button" v-show="$route.name =='ProductManagement'" @click="deleteItem(item.item.id)">Delete Item</button>
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
    width: 200px; /* Adjust the width as needed */
    height: 200px; /* Adjust the height as needed */
    object-fit: cover; /* Ensures the image is centered and covers the area */
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

.edit-button {
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

.delete-button {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #f02112;
    color: white;
    cursor: pointer;
}

.delete-button:hover {
    background-color: #f01212;
}
</style>
