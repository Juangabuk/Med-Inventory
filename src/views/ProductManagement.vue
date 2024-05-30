<template>
    <div>
        <Button @open-add-modal="openAddModal"></Button>
        <div style="margin-left: 10%">
            <div class="add-item-button-container">
                <button class="add-item-button" @click="openAddModal">Add Item</button>
            </div>
            <div class="product-grid">
                <div v-for="item in itemInventory" :key="item.id" class="product-card">
                    <img :src="item.image" :alt="item.name" class="product-image">
                    <div class="product-info">
                        <h3>{{ item.itemName }}</h3>
                        <p>Kategori: {{ item.kategori }}</p>
                        <p>Stok: {{ item.stok }}</p>
                        <button class="add">Add</button>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <Modal :visible="isModalVisible" @close="closeAddModal" @add-item="addItem"></Modal>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Modal from '../components/Modal.vue';
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
</script>

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
