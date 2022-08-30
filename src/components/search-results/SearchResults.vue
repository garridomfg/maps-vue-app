<template>
  <div v-if="isLoadingPlaces" class="alert alert-primary text-center mt-2">
    <h5>Loading...</h5>
    <span>Wait please</span>
  </div>
  <ul v-else-if="places.length > 0" class="list-group mt-3">
    <li
      v-for="place in places"
      :key="place.id"
      class="list-group-item list-group-item-action text-align-left"
      :class="{ 'active': place.id === activePlace }"
      @click="onPlaceClick(place)"
    >
      <h5>{{ place.text }}</h5>
      <p>
        {{ place.place_name }}
      </p>
      <div align="right">
        <button :class="(place.id === activePlace ? 'btn-outline-light' : 'btn-outline-primary')" class="btn btn-outline-primary">Directions</button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" src="./SearchResults"></script>

<style scoped>
li {
  cursor: pointer;
}

h5 {
  font-size: 20px;
}

p {
  font-size: 12px;
}
</style>