<template>
  <div class="not-found-container">
    <img src="../assets/Af6V.gif" alt="404 Image" class="not-found-image" />
    <h1>404</h1>
    <p>Page Not Found</p>
  </div>
</template>

<script>
export default {
  name: "PageNotFound"
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
}

.not-found-image {
  width: 200px;
  height: auto;
  margin-bottom: 20px;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: #343a40;
}

p {
  font-size: 1.5rem;
  color: #6c757d;
}
</style>
