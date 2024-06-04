<script setup>
import { ref, computed } from 'vue';
import { useItemStore } from '../stores/items';

const itemStore = useItemStore();
const currPage = ref(1);

const updatePageNumber = (newVal) => {
    if (newVal <= itemStore.totalPages && newVal > 0) {
        itemStore.getAllItem(newVal);
        currPage.value = newVal;
    }
};

const pages = computed(() => {
    const totalPages = itemStore.totalPages;
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, currPage.value - half);
    let end = Math.min(totalPages, currPage.value + half);

    if (end - start < maxPagesToShow - 1) {
        start = Math.max(1, end - maxPagesToShow + 1);
    }

    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
    }
    return pageNumbers;
});
</script>

<template>
    <div class="pagination mt-5">
        <button class="pagination-button" @click="updatePageNumber(currPage - 1)" :disabled="currPage === 1">Previous</button>
        
        <button 
            v-for="page in pages" 
            :key="page" 
            class="pagination-button" 
            @click="updatePageNumber(page)"
            :class="{ active: currPage === page }"
        >
            {{ page }}
        </button>
        
        <button class="pagination-button" @click="updatePageNumber(currPage + 1)" :disabled="currPage === itemStore.totalPages">Next</button>
    </div>
</template>

<style scoped>
.pagination-button {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #fafafa;
    cursor: pointer;
}

.pagination-button:hover {
    background-color: #fafafad1;
}

.pagination-button:disabled {
    background-color: #fdfdfd;
    color: #a3a3a3;
}

.pagination-button.active {
    background-color: #007bff;
    color: #ffffff;
}
</style>
