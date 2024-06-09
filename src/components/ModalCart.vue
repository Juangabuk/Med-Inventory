<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { useItemStore } from "../stores/items";
import { backendUrl } from "../varConstants";

const emit = defineEmits(["close"]);

const itemStore = useItemStore();

const cartItem = ref([]);

const cartData = JSON.parse(localStorage.getItem('items'));

const imageUrl = backendUrl + '/static/items/itemImg-1.jpg';

const today = new Date().toISOString().split('T')[0];

const removeItem = (id) => {
  const index = cartData.findIndex(item => item.id === id);
  if (index !== -1) {
    cartData.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(cartData));
  }
};
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h2 class="text-lg font-semibold">Item Cart</h2>
        </slot>
        <button type="button" class="btn-close" @click.stop="emit('close')">
          x
        </button>
      </header>

      <section class="modal-body">
        <div class="my-2">
          <div class="table-header">
            <div class="header-item">Nama Alat</div>
            <div class="header-item">Jumlah</div>
            <div class="header-item">Tanggal Pengembalian</div>
            <div class="header-item">Action</div>
          </div>
          <div class="flex flex-col">
            <div class="table-row" v-for="item in cartData" :key="item.id">
              <div class="cell">
                <img :src="imageUrl" alt="test" class="item-img">
                Stetoskop
              </div>
              <div class="cell">
                <button class="pagination-button">-</button>
                <span>1</span>
                <button class="pagination-button">+</button>
              </div>
              <div class="cell">
                <input type="date" class="date-input" :min="today" placeholder="dd/mm/yyyy" />
              </div>
              <div class="cell">
                <button class="trash-button" @click="removeItem(item.id)">
                  🗑️
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <footer class="modal-footer">
        <slot name="footer">
        </slot>
        <button type="button" class="btn-cancel" @click.stop="emit('close')">
          Cancel
        </button>
        <button type="button" class="btn-order">
          Order
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
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  max-height: 80%;
  /* Increased from 55% */
  min-width: 40%;
  /* Increased from 25% */
  border-radius: 3%;
  overflow: hidden;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: black;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: black;
  background: transparent;
}

.btn-cancel {
  color: #0d4dbc;
  background: white;
  border: 1px solid #0d4dbc;
  border-radius: 2%;
}

.btn-order {
  color: white;
  background: #0d4dbc;
  border: 1px solid #0d4dbc;
  border-radius: 2%;
}

img {
  width: 20rem;
  object-fit: cover;
}

.date-input {
  width: 150px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.div-desc {
  word-wrap: break-word;
}

.table-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
}

.header-item {
  flex: 1;
  text-align: center;
}

.table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cell {
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.pagination-button {
  background: #0d4dbc;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
  margin: 0 5px;
}

.pagination-button:disabled {
  background: grey;
  cursor: not-allowed;
}

.trash-button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 18px;
}
</style>
