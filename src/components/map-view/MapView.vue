<template>
  <div v-if="!isUserLocationReady" class="loading-map d-flex justify-content-center align-items-center">
    <div class="text-center">
        <h3>Wait please</h3>
        <p>Loading...</p>
    </div>
  </div>
  <div v-show="isUserLocationReady" class="map-container" ref="mapElement">

  </div>
</template>

<script lang="ts" src="./MapView.ts"></script>

<style scoped>
.loading-map {
    color: #fff;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.8);
}

.map-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
}
</style>