

<template>
  <button
    v-if="isButtonReady"
    @click="onMyLocationClick"
    class="btn btn-primary"
  >
    Go to my location
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useMapStore, usePlacesStore } from "@/composables";

export default defineComponent({
  name: "MyLocationBtn",
  setup() {
    const { userLocation, isUserLocationReady } = usePlacesStore();
    const { map, isMapReady } = useMapStore();

    return {
      isButtonReady: computed<boolean>(
        () => isUserLocationReady.value && isMapReady.value
      ),

      onMyLocationClick: () => {
        map.value?.flyTo({
          center: userLocation.value,
          zoom: 15,
        });
      },
    };
  },
});
</script>

<style scoped>
button {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>