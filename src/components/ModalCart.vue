<script setup>
import { defineProps, defineEmits, ref, computed, onMounted } from "vue";
import { useItemStore } from "../stores/items";
import {useRentStore} from "../stores/Rent"
import { backendUrl } from "../varConstants";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const emit = defineEmits(["close"]);

const itemStore = useItemStore();
const rentStore = useRentStore();
const router = useRouter()

const closeModal = () =>{
  localStorage.setItem('items', JSON.stringify(cartData.value))
  emit('close')
}


const today = new Date().toISOString().split('T')[0];

const cartData = ref(null)

onMounted(async()=>{
  const items = JSON.parse(localStorage.getItem('items'));

  let carts = []
  for (let item of items){
    await itemStore.getDetailItem(item.itemId)
      const userData = JSON.parse(localStorage.getItem('user_data'))
      const currItem = {
        imageUrl: backendUrl+'/static/'+itemStore.detailItem.gambar,
        jumlah: item.jumlah ? item.jumlah : 1,
        name: itemStore.detailItem.namaBarang,
        tanggalKembali: today,
        itemId: item.itemId,
        userId: userData.id,
        tanggalPinjam: new Date().toISOString().split('T')[0],
        id : item.itemId
      }
      carts.push(currItem)
  }
  cartData.value = carts
})

const removeItem = (id) => {
  const index = cartData.value.findIndex(item => item.id === id);
  if (index !== -1) {
    cartData.value.splice(index, 1);
  }
};

const changeItemValue = (id, newVal) => {
  for (let item of cartData.value){
    if (item.id == id){
      item.jumlah = newVal
    }
  }
}

const submitCart = () =>{
  Swal.fire({
                title: "Are you sure?",
                text: "Make sure your order is correct",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Order it!"
            }).then(async(result) => {
                if (result.isConfirmed) {
                  await rentStore.postRentItems(cartData.value) 
                } 
              })
              .then(()=>{
                  Swal.fire({
                    title: "Success!",
                    text: "Rent Items Successful!",
                    icon: "success"
                  });
                  localStorage.removeItem('items')
                closeModal()
                router.go()
              })
              .catch(err=>{
                Swal.fire({
                  toast: true,
                  showConfirmButton: true,
                  icon: 'error',
                  title: 'Permission denied',
                  text: `${err.response.data.message}`
                });
              })
  
}
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h2 class="text-lg font-semibold">Item Cart</h2>
        </slot>
        <button type="button" class="btn-close" @click.stop="closeModal">
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
            <div class="table-row" v-for="(item,index) in cartData" :key="index">
              <div class="cell">
                <img :src="item.imageUrl" :alt="item.name" class="item-img">
                {{ item.name }}
              </div>
              <div class="cell">
                <button class="pagination-button" @click="changeItemValue(item.id, item.jumlah-1)" :disabled="item.jumlah == 1">-</button>
                <span>{{ item.jumlah }}</span>
                <button class="pagination-button" @click="changeItemValue(item.id, item.jumlah+1)">+</button>
              </div>
              <div class="cell">
                <input type="date" class="date-input" :min="today" v-model="item.tanggalKembali" placeholder="dd/mm/yyyy" />
              </div>
              <div class="cell">
                <button class="trash-button" @click="removeItem(item.itemId)">
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
        <button type="button" class="btn-cancel" @click.stop="closeModal">
          Cancel
        </button>
        <button type="button" class="btn-order" @click.prevent="submitCart">
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
  z-index: 2;
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
