<script setup>
import { ref, onMounted, computed } from 'vue';
import Header from '../components/Header.vue';
import ItemCard from '../components/ItemCard.vue';
import { useItemStore } from '../stores/items';
import { useLoginStore } from '../stores/login';
import Pagination from '../components/Pagination.vue';

const userStore = useLoginStore()
const itemStore = useItemStore()

const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const sortItems = (criteria) => {
  // Assuming your itemStore has a method for sorting
  itemStore.sortItems(criteria)
  dropdownOpen.value = false
}

onMounted(()=>{
    console.log("hit")
    itemStore.getAllItem()
})

const userData = JSON.parse(localStorage.getItem('user_data'))
let searchQuery = ref(null)
function searchItems () {
    itemStore.getAllItem(1, searchQuery.value)
}

</script>

<template>
    <!-- <Header></Header> -->
    <div style="margin-left: 2%">
        <div class="welcome mt-5 text-left text-3xl">
            <h1> Hello {{ userData.username }}, Welcome on MedInventory</h1>
        </div>
        <div class="search-bar mt-3 flex items-center w-1/2">
            <input type="text" placeholder="Search for items..." v-model="searchQuery" class="p-2 border rounded-l flex-1">
            <button @click="searchItems" class="search-button p-2 border rounded-r bg-blue-500 text-white ml-2">Search</button>
            <div class="relative ml-2">
                <button @click="toggleDropdown" class="filter-button p-2 border rounded bg-blue-500 text-white">
                    Filter
                </button>
                <div v-if="dropdownOpen" class="dropdown-menu absolute mt-2 w-48 bg-white border rounded shadow-lg">
                    <ul>
                        <li @click="sortItems('Jumlah Desc')" class="p-2 hover:bg-gray-200 cursor-pointer">Stock terbanyak</li>
                        <li @click="sortItems('Jumlah Asc')" class="p-2 hover:bg-gray-200 cursor-pointer">Stock terendah</li>
                        <li @click="sortItems('Nama Desc')" class="p-2 hover:bg-gray-200 cursor-pointer">Nama Produk (Z-A)</li>
                        <li @click="sortItems('Nama Asc')" class="p-2 hover:bg-gray-200 cursor-pointer">Nama Produk (A-Z)</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="product-grid">
            <ItemCard v-for="item in itemStore.items" :key="item.id" :item="item"/>
        </div>
        <Pagination />
    </div>
</template>

<style scoped>
.product-grid {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
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

.search-bar {
    display: flex;
    align-items: center;
    width: 50%;
}

.search-button {
    background-color: #4299e1; /* Tailwind's blue-500 */
    color: white;
    border: 1px solid #4299e1;
}

.search-button:hover {
    background-color: #2b6cb0; /* Tailwind's blue-700 */
}

input {
    flex: 1;
    border: 1px solid #cbd5e0; /* Tailwind's gray-400 */
}

input:focus {
    outline: none;
    border-color: #63b3ed; /* Tailwind's blue-300 */
}

.filter-button {
    background-color: #4299e1; /* Tailwind's blue-500 */
    color: white;
    border: 1px solid #4299e1;
}

.filter-button:hover {
    background-color: #2b6cb0; /* Tailwind's blue-700 */
}

.dropdown-menu {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.dropdown-menu li {
    padding: 10px;
    cursor: pointer;
}

.dropdown-menu li:hover {
    background-color: #f5f5f5;
}
</style>
