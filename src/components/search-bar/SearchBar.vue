<template>
  <div class="searchbar-container">
    <input
      class="form-control"
      type="text"
      placeholder="Where do you want to go?"
      v-model="searchTerm"
    />

    <SearchResults />
  </div>
</template>

<script lang="ts" src="./SearchBar"></script>

<style scoped>
.searchbar-container {
  position: fixed;
  top: 30px;
  left: 30px;
  background: #fff;
  z-index: 2;
  box-shadow: 0 5px 10px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
  padding: 5px;
}
</style>