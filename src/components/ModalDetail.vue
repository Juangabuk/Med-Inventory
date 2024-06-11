<script setup>
import { defineProps, defineEmits, ref, onMounted, onBeforeMount } from "vue"
import { useItemStore } from "../stores/items";
import { backendUrl } from "../varConstants";

const emit = defineEmits(["close"]);

const itemStore = useItemStore()

const imageUrl = backendUrl + '/static/' + itemStore.detailItem.gambar;
</script>

<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header class="modal-header">
                <slot name="header">
                    <h2 class="text-lg font-semibold">Detail Item</h2>
                </slot>
                <button
                    type="button"
                    class="btn-close"
                    @click.stop="emit('close')"
                >
                    &times;
                </button>
            </header>

            <section class="modal-body">
                <div class="item-details">
                    <h1 class="item-name">{{ itemStore.detailItem.namaBarang }}</h1>
                    <div class="item-content">
                        <div class="item-image">
                            <img :src="imageUrl" :alt="itemStore.detailItem.namaBarang">
                        </div>
                        <div class="item-info">
                            <p class="description">{{itemStore.detailItem.deskripsi}}</p>
                            <p class="quota">Quota: {{ itemStore.detailItem.jumlah }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="modal-footer">
                <slot name="footer"></slot>
                <button
                    type="button"
                    class="btn-green"
                    @click.stop="emit('close')"
                >
                    Close Modal
                </button>
            </footer>
        </div>
    </div>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    width: 80%;
    max-width: 500px;
}

.modal-header,
.modal-footer {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
}

.modal-body {
    padding: 16px;
}

.btn-close {
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #333;
}

.btn-green {
    color: white;
    background-color: #0d4dbc;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.btn-green:hover {
    background-color: #0b3a99;
}

.item-details {
    text-align: center;
}

.item-name {
    font-size: 24px;
    margin-bottom: 16px;
    color: #333;
}

.item-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.item-image img {
    width: 100%;
    max-width: 200px;
    border-radius: 8px;
    margin-bottom: 16px;
}

.item-info {
    flex: 1;
    padding-left: 16px;
}

.description {
    font-size: 16px;
    color: #666;
    margin-bottom: 8px;
}

.quota {
    font-size: 16px;
    color: #333;
    font-weight: bold;
}
</style>
