<script setup>
import { onMounted } from 'vue';
import {useRentStore} from '../stores/Rent'


const rent = useRentStore()

onMounted(()=>{
    rent.getAllHistory()
})

</script>
<template>
    <div class="history-table">
      <h1>History</h1>
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in rent.items" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.item.namaBarang }}</td>
            <td>{{ item.item.jumlah }}</td>
            <td>{{ formatDate(item.tanggalPinjam) }}</td>
            <td>{{ formatDate(item.tanggalKembali) }}</td>
            <td><a :href="item.statusLink" class="status-link">{{ item.status }}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <!-- <script>
import { backendUrl } from '../varConstants';

  export default {
    data() {
      return {
        searchQuery: '',
        items: []
      };
    },
    computed: {
      filteredItems() {
        return this.items.filter(item => item.Item.namaBarang.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
    },
    methods: {
      search() {
        // Implement search functionality if needed
      },
      fetchData() {
        // Replace this URL with your actual API endpoint
        fetch( `${backendUrl}/admin/rented-item`)
          .then(response => response.json())
          .then(data => {
            this.items = data.data;
          })
          .catch(error => console.error('Error fetching data:', error));
      },
      formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('en-GB', options);
      }
    },
    mounted() {
      this.fetchData();
    }
  };
  </script> -->
  
  <style scoped>
  .history-table {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  h1 {
    text-align: left;
    font-size: xx-large;
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
  