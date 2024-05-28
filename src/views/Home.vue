<template>
    <Header></Header>
    <div style="margin-left: 10%">
        <div class="welcome">
            <h1> Hello {{ name }}, Welcome on MedInventory</h1>
        </div>
        <div class="product-grid">
            <div v-for="item in itemInventory" :key="item.id" class="product-card">
                <img :src="item.image" :alt="item.name" class="product-image">
                <div class="product-info">
                    <h3>{{ item.itemName }}</h3>
                    <p>Kategori: {{ item.kategori }}</p>
                    <p>Stok: {{ item.stok }}</p>
                    <button class="detail-button">Detail</button>
                    <button class="add-to-cart-button">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import axios from 'axios';

export default {
    name: "Home",
    data (){
        return {
            name: '',
            itemInventory: [],
        }
    },
    components: {
        Header
    },
    async mounted()
    {
        let user = localStorage.getItem('user-info');
        this.name = JSON.parse(user).name;
        if(!user)
        {
            this.$router.push({name:'SignUp'})
        }
        let result =await axios.get("http://localhost:3000/itemInventory");
        console.warn(result)
        this.itemInventory=result.data;
    },
    // data() {
    //     return {
    //         isDropdownOpen: false,
    //         products: [
    //             { id: 1, name: 'Kasur', category: 'Logistik Pasien', stock: 5, image: 'https://picsum.photos/id/237/200/300' },
    //             { id: 2, name: 'Rak Besi', category: 'Logistik Gudang', stock: 20, image: 'https://picsum.photos/id/238/200/300' },
    //             { id: 3, name: 'Pemeriksaan USG', category: 'Alat Kesehatan', stock: 12, image: 'https://picsum.photos/id/239/200/300' }
    //         ],
    //     };
    // },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
    },
};
</script>

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

.upper-Section {
    width: 80%;
    height: 160px;
    margin-bottom: 30px;
    border-radius: 4px;
    border-radius: 4px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(248, 243, 243, 0.09),
        0 100px 80px rgba(255, 255, 255, 0.12);
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

.sd {
    font-size: 20px;
    color: #346edb;
    font-weight: 700;
    padding-left: 20px;
    padding-right: 70px;
    padding-bottom: 25px;
    padding-top: 24px;
}

.sm {
    font-size: 20px;
    color: #3f3844;
    font-weight: bold;
    padding-left: 20px;
    /* padding-top: 30px; */
    /* padding-left: 20px; */
    /* padding-right: 70px;; */
}

.AMS {
    margin-left: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 4px;
    font-size: 30px;
    font-weight: bold;
    color: #ffffff;
    background-color: #3f3844;
}

.asm {
    font-size: 25px;
    margin-left: 5px;
}

.add-entry {
    margin-left: 37em;
    font-size: 15px;
    font-weight: normal;
    color: #346edb;
    cursor: pointer;
}

.navbar {
    margin-bottom: 30px;
}

.nav-link {
    padding: 0.5rem 0.75rem;
    margin-right: 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    /* text-sm */
    color: #3B82F6;
    /* text-blue-500 */
    text-decoration: none;
}

.nav-link:hover {
    background-color: #EFF6FF;
    /* bg-blue-50 */
    color: #2563EB;
    /* text-blue-700 */
}

.profile-area .dropdown-menu {
    position: absolute;
    right: 0;
    top: 100%;
    width: 200px;
    /* Adjusted width */
    background-color: white;
    border-radius: 0.375rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    z-index: 50;
}

.dropdown-item {
    display: block;
    padding: 0.5rem 1rem;
    color: #374151;
    /* text-gray-700 */
    text-decoration: none;
}

.dropdown-item:hover {
    background-color: #F3F4F6;
    /* bg-gray-100 */
}
</style>