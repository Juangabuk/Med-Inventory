<script setup>
import { defineProps, defineEmits, ref, onMounted, onBeforeMount, computed } from "vue"
import { useItemStore } from "../stores/items";
import { backendUrl } from "../varConstants";
import { routerKey, useRouter } from "vue-router";

const emit = defineEmits(["close"]);
const editStatus = defineProps(["editStatus"])
const router = useRouter();

const itemStore = useItemStore()
const categories = ref(['Medis','Nonmedis'])

const formData = ref({
  namaBarang:'',
  jumlah:0,
  kategori:'',
  deskripsi:'',
  lokasi:'',
  gambar:''
})


const form = computed(()=>{
  if (editStatus.editStatus == true){
    formData.namaBarang = itemStore.detailItem.namaBarang
    formData.jumlah = itemStore.detailItem.jumlah
    formData.kategori = itemStore.detailItem.kategori
    formData.deskripsi= itemStore.detailItem.deskripsi
    formData.lokasi = itemStore.detailItem.lokasi

    return formData
  }
  else {
    return formData
  }
})

function onFileChange(event){
      form.gambar= event.target.files[0]
  }

function submitAddForm(formData){
    const fd = new FormData()

    fd.append('namaBarang',formData.namaBarang)
    fd.append('jumlah',formData.jumlah)
    fd.append('kategori',formData.kategori)
    fd.append('deskripsi',formData.deskripsi)
    fd.append('lokasi',formData.lokasi)
    fd.append('gambar',form.gambar)

    if (editStatus.editStatus){
      itemStore.handleEditItem(fd, itemStore.detailItem.id)
    } else{
      itemStore.handleAddItem(fd)
    }
    
    emit('close')
    router.go()
}

// const imageUrl = backendUrl + '/static/' + itemStore.detailItem.gambar;

</script>

<template>
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            <h2 class="text-lg font-semibold">Add Item</h2>
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
          <form @submit.prevent="submitAddForm(form)">
            <div class="form-group">
              <label for="itemName">Item Name</label>
              <input type="text" class="form-control" id="itemName" v-model="form.namaBarang" placeholder="Enter item name" required>
            </div>
            <div class="form-group">
              <label for="itemStock">Stock Quantity</label>
              <input type="number" class="form-control" id="itemStock" v-model="form.jumlah" placeholder="Enter stock quantity" required>
            </div>
            <div class="form-group">
              <label for="itemName">Location</label>
              <input type="text" class="form-control" id="itemName" v-model="form.lokasi" placeholder="Enter item location" required>
            </div>
            <div class="form-group">
              <label for="itemName">Category</label>
              <select class="form-control" id="itemCategory" v-model="form.kategori" required>
                <option value="" disabled>Select category</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="itemName">Location</label>
              <textarea class="form-control" id="itemDescription" v-model="form.deskripsi" rows="3" placeholder="Enter item description" required></textarea>
            </div>
            <div class="form-group">
              <label for="itemPhoto">Upload Photo</label>
              <input v-on:change="onFileChange" type="file" class="form-control-file" >
            </div>
            <button type="submit" class="btn btn-primary">Save Item</button>
            </form>
          </section>
  
        <footer class="modal-footer">
          <slot name="footer">

          </slot>
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
  max-width:25%;
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

.btn-green {
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