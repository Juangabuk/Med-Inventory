<script setup>
import { onMounted } from 'vue';
import Header from '../components/Header.vue';
import ItemCard from '../components/ItemCard.vue';
import { useItemStore } from '../stores/items';
import { useLoginStore } from '../stores/login';

onMounted(() => {
    itemStore.getAllItem()
})



const userStore = useLoginStore()
const itemStore = useItemStore()

const userData = JSON.parse(localStorage.getItem('user_data'))



// console.log(itemStore.items)

</script>

<template>
    <div class="welcome mt-5 text-left text-3xl">
        <h1> Hello {{ userData.username }}, Welcome on MedInventory</h1>
    </div>
    <div>
        <Button @open-add-modal="openAddModal"></Button>
        <div style="margin-left: 10%">
            <div class="add-item-button-container">
                <button class="add-item-button" @click="openAddModal">Add Item</button>
            </div>
            <div class="search-bar mt-3 flex items-center w-1/2">
                <input type="text" placeholder="Search for items..." v-model="searchQuery"
                    class="p-2 border rounded-l flex-1">
                <button @click="searchItems"
                    class="search-button p-2 border rounded-r bg-blue-500 text-white ml-2">Search</button>
                <div class="relative ml-2">
                    <button @click="toggleDropdown" class="filter-button p-2 border rounded bg-blue-500 text-white">
                        Filter
                    </button>
                    <div v-if="dropdownOpen" class="dropdown-menu absolute mt-2 w-48 bg-white border rounded shadow-lg">
                        <ul>
                            <li @click="sortItems('stockDesc')" class="p-2 hover:bg-gray-200 cursor-pointer">Stock
                                terbanyak</li>
                            <li @click="sortItems('stockAsc')" class="p-2 hover:bg-gray-200 cursor-pointer">Stock
                                terendah</li>
                            <li @click="sortItems('nameDesc')" class="p-2 hover:bg-gray-200 cursor-pointer">Nama Produk
                                (Z-A)</li>
                            <li @click="sortItems('nameAsc')" class="p-2 hover:bg-gray-200 cursor-pointer">Nama Produk
                                (A-Z)</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="product-grid">
                <ItemCard v-for="item in itemStore.items" :key="item.id" :item="item" />
                <!-- <div v-for="item in itemInventory" :key="item.id" class="product-card">
                    <img :src="item.image" :alt="item.name" class="product-image">
                    <div class="product-info">
                        <h3>{{ item.itemName }}</h3>
                        <p>Kategori: {{ item.kategori }}</p>
                        <p>Stok: {{ item.stok }}</p>
                        <button class="add">Add</button>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </div> -->
            </div>
        </div>
        <Modal :visible="isModalVisible" @close="closeAddModal" @add-item="addItem"></Modal>
    </div>
</template>

<!-- <script>
import Header from '../components/Header.vue';
import Modal from '../components/Modal.vue';
import ItemCard from '../components/ItemCard.vue';
import axios from 'axios';

export default {
    name: "ProductManagement",
    components: {
        Header,
        Modal
    },
    data() {
        return {
            name: '',
            itemInventory: [],
            isModalVisible: false
        };
    },
    async mounted() {
        let user = localStorage.getItem('user-info');
        this.name = JSON.parse(user).name;
        if (!user) {
            this.$router.push({ name: 'SignUp' })
        }
        let result = await axios.get("http://localhost:3000/itemInventory");
        this.itemInventory = result.data;
    },
    methods: {
        openAddModal() {
            this.isModalVisible = true;
        },
        closeAddModal() {
            this.isModalVisible = false;
        },
        addItem(newItem) {
            this.itemInventory.push(newItem);
        }
    }
};
</script> -->

<style scoped>
.product-grid {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.add-item-button-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.add-item-button {
    padding: 10px 20px;
    border: none;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
}

.add-item-button:hover {
    background-color: #0056b3;
}

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

.add,
.edit,
.delete {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    color: white;
    cursor: pointer;
}

.add {
    background-color: #007BFF;
}

.edit {
    background-color: #28A745;
}

.delete {
    background-color: #FF0000;
}

.add:hover,
.edit:hover,
.delete:hover {
    opacity: 0.8;
}
</style>
