<template>
    <div class="h-screen bg-slate-200 flex flex-col text-left p-4 gap-4">
        <div @click="toggleItems" class="my-5 hamburger flex p-3 rounded-md cursor-pointer bg-slate-300 w-fit hover:bg-slate-400 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
        </div>
        <div :class="itemsClass" class="flex flex-col gap-4">
            <a class="w-64 px-4" v-for="item in navItems" :key="item.name" :href="item.url">{{ item.name }}</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showItems: false,
            navItems: [
                {
                    name: '🏡 Home',
                    url: '/'
                },
                {
                    name: '📦 Product Management',
                    url: '/product-management'
                },
                {
                    name: '📓 Daftar Riwayat',
                    url: '#'
                }
            ]
        };
    },
    computed: {
        itemsClass() {
            return {
                'hidden': !this.showItems,
                'flex': this.showItems
            };
        }
    },
    methods: {
        toggleItems() {
            this.showItems = !this.showItems;
        }
    }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
