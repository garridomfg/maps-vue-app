<template>
  <div v-if="distance" class="trip-container column">
    <div class="col">Distance: <strong>{{distance}} kms</strong></div>
    <div class="col">Duration: <strong>{{duration}} min</strong></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMapStore } from "@/composables";
export default defineComponent({
  name: "TripDetails",
  setup() {
    const { distance, duration } = useMapStore();

    return {
      distance,
      duration,
    };
  },
});
</script>

<style scoped>
.trip-container {
  padding: 10px;
  position: fixed;
  bottom: 50px;
  left: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  width: 280px;
}

strong {
  color: #42b983;
}
</style>