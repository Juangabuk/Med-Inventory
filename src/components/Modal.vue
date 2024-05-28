<template>
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-bold mb-4">Add Item</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">ID</label>
                    <input type="text" v-model="id" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Item Name</label>
                    <input type="text" v-model="itemName" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Jumlah</label>
                    <input type="number" v-model="jumlah" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add
                    </button>
                    <button type="button" @click="close"
                        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            id: '',
            itemName: '',
            jumlah: ''
        };
    },
    methods: {
        handleSubmit() {
            this.$emit('add-item', { id: this.id, itemName: this.itemName, jumlah: this.jumlah });
            this.close();
        },
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
.fixed {
    position: fixed;
}

.inset-0 {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.z-50 {
    z-index: 50;
}

.flex {
    display: flex;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}

.bg-black {
    background-color: black;
}

.bg-opacity-50 {
    background-opacity: 0.5;
}

.bg-white {
    background-color: white;
}

.p-6 {
    padding: 1.5rem;
}

.rounded-lg {
    border-radius: 0.5rem;
}

.shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.w-96 {
    width: 24rem;
}

.text-xl {
    font-size: 1.25rem;
}

.font-bold {
    font-weight: 700;
}

.mb-4 {
    margin-bottom: 1rem;
}

.shadow {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.appearance-none {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.border {
    border-width: 1px;
}

.rounded {
    border-radius: 0.25rem;
}

.w-full {
    width: 100%;
}

.py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}

.leading-tight {
    line-height: 1.25;
}

.focus\:outline-none:focus {
    outline: none;
}

.focus\:shadow-outline:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.bg-blue-500 {
    background-color: #4299e1;
}

.hover\:bg-blue-700:hover {
    background-color: #2b6cb0;
}

.text-white {
    color: #ffffff;
}

.bg-gray-500 {
    background-color: #6b7280;
}

.hover\:bg-gray-700:hover {
    background-color: #4b5563;
}
</style>