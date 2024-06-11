<script setup>
import { defineProps, defineEmits, ref, computed } from "vue"
import { useItemStore } from "../stores/items";
import { backendUrl } from "../varConstants";
import { useRouter } from "vue-router";

const emit = defineEmits(["close"]);
const editStatus = defineProps(["editStatus"])
const router = useRouter();

const itemStore = useItemStore()
const categories = ref(['Medis', 'Nonmedis'])

const formData = ref({
  namaBarang: '',
  jumlah: 0,
  kategori: '',
  deskripsi: '',
  lokasi: '',
  gambar: ''
})

const form = computed(() => {
  if (editStatus.editStatus == true) {
    formData.namaBarang = itemStore.detailItem.namaBarang
    formData.jumlah = itemStore.detailItem.jumlah
    formData.kategori = itemStore.detailItem.kategori
    formData.deskripsi = itemStore.detailItem.deskripsi
    formData.lokasi = itemStore.detailItem.lokasi

    return formData
  }
  else {
    return formData
  }
})

function onFileChange(event) {
  form.gambar = event.target.files[0]
}

async function submitAddForm(formData) {
  const fd = new FormData()

  fd.append('namaBarang', formData.namaBarang)
  fd.append('jumlah', formData.jumlah)
  fd.append('kategori', formData.kategori)
  fd.append('deskripsi', formData.deskripsi)
  fd.append('lokasi', formData.lokasi)
  fd.append('gambar', form.gambar)

  if (editStatus.editStatus) {
    await itemStore.handleEditItem(fd, itemStore.detailItem.id)
      .then((data) => {
        router.go()
      })
  } else {
    await itemStore.handleAddItem(fd)
      .then((data) => {
        router.go()
      })
  }

  emit('close')
}
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
            <label for="itemLocation">Location</label>
            <input type="text" class="form-control" id="itemLocation" v-model="form.lokasi" placeholder="Enter item location" required>
          </div>
          <div class="form-group">
            <label for="itemCategory">Category</label>
            <select class="form-control" id="itemCategory" v-model="form.kategori" required>
              <option value="" disabled>Select category</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="itemDescription">Description</label>
            <textarea class="form-control" id="itemDescription" v-model="form.deskripsi" rows="3" placeholder="Enter item description" required></textarea>
          </div>
          <div class="form-group">
            <label for="itemPhoto">Upload Photo</label>
            <input v-on:change="onFileChange" type="file" class="form-control-file" :required="editStatus.editStatus == true ? null : true">
          </div>
          <button type="submit" class="btn btn-success">Save Item</button>
        </form>
      </section>

      <footer class="modal-footer">
        <slot name="footer">
        </slot>
        <button
          type="button"
          class="btn btn-secondary"
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
  overflow-x: hidden;
  overflow-y: auto; /* Enable vertical scrolling */
  display: flex;
  flex-direction: column;
  max-height: 80%; /* Increased from 55% */
  max-width: 50%; /* Increased from 25% */
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
  overflow-y: auto; /* Ensure the body is scrollable */
  max-height: calc(80vh - 120px); /* Adjust based on the modal height minus the header and footer height */
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

.btn-success {
  color: white;
  background: #28a745;
  border: 1px solid #28a745;
  border-radius: 2%;
}

.btn-secondary {
  color: white;
  background: #6c757d;
  border: 1px solid #6c757d;
  border-radius: 2%;
}

img {
  width: 20rem;
  object-fit: cover;
}

.div-desc {
  word-wrap: break-word;
}

.form-group {
  margin-bottom: 15px;
}

.form-control,
.form-control-file {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.form-control:focus {
  border-color: #80bdff;
  outline: 0;
  /* box-shadow: 0 0 5px rgba(0, 123, 255, 0.25); */
}

textarea.form-control {
  resize: vertical;
  background-color: white;
  color: black;
}

select.form-control{
  background-color: white;
  color: black;
}


</style>
