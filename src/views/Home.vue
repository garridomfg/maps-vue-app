<template>
  <MapView />
  <MyLocationBtn />
  <SearchBar />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePlacesStore } from '../composables/usePlacesStore';
import MapView from '../components/map-view/MapView.vue'
import MyLocationBtn from '../components/my-location-btn/MyLocationBtn.vue'
import SearchBar from "@/components/search-bar/SearchBar.vue";

export default defineComponent({
  name: "Home",
  components: { MapView, MyLocationBtn, SearchBar },
  setup() {
    usePlacesStore()
  }
});
</script>
