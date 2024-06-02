<script setup>
import { ref } from 'vue';
import { useItemStore } from '../stores/items';




const itemStore = useItemStore()
const currPage = ref(1)

const updatePageNumber = (newVal) =>{
    if (newVal <= itemStore.totalPages && newVal > 0){
        itemStore.getAllItem(newVal)
        currPage.value = newVal
    }
}
</script>

<template>
    <div class="pagination mt-5">
            <button class="pagination-button" @click="updatePageNumber(currPage - 1)" :disabled="currPage === 1">Previous</button>
            <span>{{ currPage }}</span>
            <button class="pagination-button" @click="updatePageNumber(currPage + 1)" :disabled="currPage === itemStore.totalPages">Next</button>
    </div>
</template>

<style scoped>
.pagination-button{
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #fafafa;
    cursor: pointer;
}

.pagination-button:hover{
    background-color: #fafafad1;
}

.pagination-button:disabled{
    background-color: #fdfdfd;
    color:#a3a3a3;
}
</style>