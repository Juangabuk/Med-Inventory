<script setup>
import { onMounted } from 'vue';
import { useRentStore } from '../stores/Rent';
import Swal from 'sweetalert2';



const rent = useRentStore();

onMounted(() => {
  rent.getAllHistory();
});

function formatDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('en-GB', options);
}

function canReturn(status) {
  return status === 'Sedang Dipinjam' || status === 'Belum Dikembalikan';
}

function returnItem(itemId) {
  Swal.fire({
  title: "Apakah Anda Ingin Mengembalikan Barang?",
  text: "Pastikan Anda Telah Selesai Menggunakannya!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  cancelButtonText: "Tunggu Dulu!",
  confirmButtonText: "Ya Kembalikan!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Sukses Mengembalikan",
      text: "Terimakasih Atas Perhatiannya!",
      icon: "success"
    });
  }
});
  // Implement the logic to handle item return
  console.log('Returning item with ID:', itemId);
}

const role = localStorage.role
const users = ["User1", "User2", "User3"]; // Replace with actual user data
</script>

<template>
  <div v-if="role === 'Admin'" class="history-table">
    <h1>History</h1>
    <div class="search-container">
      <input type="text" placeholder="Search" v-model="searchQuery" />
      <button @click="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
      <label for="user-select" class="user-select-label">Select User: </label>
      <select id="user-select" v-model="selectedUser">
        <option v-for="user in users" :key="user" :value="user">{{ user }}</option>
      </select>
    </div>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Barang</th>
          <th>Jumlah</th>
          <th>Tanggal Peminjaman</th>
          <th>Tanggal Pengembalian</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in rent.items" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.Item.namaBarang }}</td>
          <td>{{ item.jumlah }}</td>
          <td>{{ formatDate(item.tanggalPinjam) }}</td>
          <td>{{ formatDate(item.tanggalKembali) }}</td>
          <td><a :href="item.statusLink" class="status-link">{{ item.status }}</a></td>
          <td>
            <button class="return-button" @click="returnItem(item.id)" :disabled="!canReturn(item.status)">
              Kembalikan Barang
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="history-table">
    <h1>History User</h1>
    <div class="search-container">
      <input type="text" placeholder="Search" v-model="searchQuery" />
      <button @click="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Barang</th>
          <th>Jumlah</th>
          <th>Tanggal Peminjaman</th>
          <th>Tanggal Pengembalian</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in rent.items" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.Item.namaBarang }}</td>
          <td>{{ item.jumlah }}</td>
          <td>{{ formatDate(item.tanggalPinjam) }}</td>
          <td>{{ formatDate(item.tanggalKembali) }}</td>
          <td><a :href="item.statusLink" class="status-link">{{ item.status }}</a></td>
          <td>
            <button class="return-button" @click="returnItem(item.id)" :disabled="!canReturn(item.status)">
              Kembalikan Barang
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.history-table {
  font-family: Arial, sans-serif;
  margin: 20px;
}
h1 {
  text-align: left;
  font-size: xx-large;
}
.return-button{
  background-color: #569de8;
  color: #ddd;
}

.return-button:disabled{
  background-color: red;
  color: #ddd;
  cursor: not-allowed;
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}
input[type="text"] {
  width: 200px; /* Adjust the width as needed */
  padding: 5px;
  font-size: 14px;
}
button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}
button svg {
  width: 20px;
  height: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead {
  background-color: #f2f2f2;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
.status-link {
  color: blue;
  text-decoration: none;
}
.status-link:hover {
  text-decoration: underline;
}
</style>
