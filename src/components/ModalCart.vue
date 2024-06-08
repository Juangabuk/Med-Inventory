<script setup>
import { defineProps, defineEmits, ref, onMounted, onBeforeMount } from "vue"
import { useItemStore } from "../stores/items";
import { backendUrl } from "../varConstants";

const emit = defineEmits(["close"]);

const itemStore = useItemStore();

const cartItem = ref([])

const cartData = JSON.parse(localStorage.getItem('items'))

const imageUrl = backendUrl + '/static/items/itemImg-1.jpg'

onMounted(()=>{
  for (item in cartData){
    cartItem.value.push(item)
  }
})


</script>

<template>
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            <h2 class="text-lg font-semibold">Item Cart</h2>
          </slot>
          <button
            type="button"
            class="btn-close"
            @click.stop="emit('close')"
          >
            x
          </button>
        </header>
  
        <section class="modal-body">
          <div class="my-2">
            <div class="flex flex-col">
              <div class="flex flex-row justify-content-center align-content-center">
                <div>
                  <img :src="imageUrl" alt="test" style="width:100px;height:100px;" >
                </div>
                <div>
                  Stetoskop
                </div>
                <div class="grow space-x-4">
                  <button class="pagination-button"  >-</button>
                  <span>1</span>
                  <button class="pagination-button" >+</button>
                </div>
              </div>
              <div class="flex flex-row justify-content-center align-content-center">
                <div>
                  <img :src="imageUrl" alt="test" style="width:100px;height:100px;" >
                </div>
                <div>
                  Stetoskop
                </div>
                <div class="grow space-x-4">
                  <button class="pagination-button"  >-</button>
                  <span>1</span>
                  <button class="pagination-button" >+</button>
                </div>
              </div>
            </div>
          </div>
         </section>
  
        <footer class="modal-footer">
          <slot name="footer">
          </slot>
          <button
            type="button"
            class="btn-cancel"
            @click.stop="emit('close')"
          >
            Cancel
          </button>
          <button
          type="button"
          class="btn-order">
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
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  max-height:55%;
  min-width:25%;
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

img{
  width:20rem;
  object-fit: cover;
}

.div-desc{
  word-wrap: break-word;
}


</style>