import { defineComponent, onMounted, ref, watch } from "vue";
import mapboxgl from "mapbox-gl";
import { useMapStore, usePlacesStore } from "@/composables";

export default defineComponent({
  name: "MapView",
  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { isLoading, userLocation, isUserLocationReady } = usePlacesStore();
    const { setMap } = useMapStore();

    const initMap = async () => {
      if (!mapElement.value) return;
      if (!userLocation.value) return;

      await Promise.resolve();

      const map = new mapboxgl.Map({
        container: mapElement.value,
        style: "mapbox://styles/mapbox/streets-v11",
        center: userLocation.value,
        zoom: 15,
      });

      const myLocationPopup = new mapboxgl.Popup({
        closeButton: false,
      }).setLngLat(userLocation.value).setHTML(`
            <h6>You are here</h6>
          `);

      const myLocationMarker = new mapboxgl.Marker()
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map);

      setMap(map);
    };

    onMounted(() => {
      if (isUserLocationReady.value) return initMap();
    });

    watch(isUserLocationReady, (/* newVal */) => {
      if (isUserLocationReady.value) initMap();
    });

    return {
      isLoading,
      userLocation,
      isUserLocationReady,
      mapElement,
    };
  },
});
