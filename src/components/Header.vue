<template>
    <div class="nav">
        <div class="logo-container">
            <router-link to="/"
                class="AMS text-blue-500 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">Med-Inventory</router-link>
            <span class="asm">Inventory Management System</span>
        </div>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/product-management">Product Management</a>
            <a href="#">Daftar Riwayat</a>
        </div>
        <div class="nav-right">
            <div class="dropdown">
                <button class="dropbtn">Account</button>
                <div class="dropdown-content">
                    <a href="/profile">Profile</a>
                    <a href="/login" @click="logout">Logout</a>
                </div>
            </div>
            <img class="profile-pic" src="https://picsum.photos/200/300?grayscale" alt="Profile Picture">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        logout() {
            localStorage.removeItem('user-info');
            this.$router.push({ name: 'Login' });
        }
    }
}
</script>

<style scoped>
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 10px 20px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
}

.nav a:hover {
    background: #ddd;
    color: #333;
}

.nav-links {
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
}

.nav-links a {
    margin-right: 15px;
    text-decoration: none;
    color: #333;
    font-size: 16px;
}

.nav-right {
    display: flex;
    align-items: center;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropbtn {
    background-color: #ffffff;
    color: #333;
    padding: 10px;
    font-size: 16px;
    border: none;
    cursor: pointer;
}

.dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    background-color: #f1f1f1;
}

.profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
}

@media (max-width: 768px) {
    .nav {
        flex-direction: column;
        align-items: flex-start;
    }

    .nav-links {
        flex-direction: column;
        align-items: flex-start;
    }

    .nav-right {
        margin-left: 0;
    }

    .nav-links a,
    .dropbtn {
        margin-bottom: 10px;
    }

    .profile-pic {
        margin-left: 0;
    }
}

.logo-container {
    display: flex;
    flex-direction: column;
    margin-right: 15px;
}

.AMS {
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 4px;
    font-size: 30px;
    font-weight: bold;
    color: #ff0000;
    background-color: #000000;
}

.asm {
    font-size: 16px;
    margin-left: 0;
}
</style>
