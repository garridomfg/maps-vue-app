import { defineComponent, ref, watch } from 'vue';
import { usePlacesStore } from "../../composables/usePlacesStore";
import { useMapStore } from "../../composables/useMapStore";
import { Feature } from "../../interfaces/places";

export default defineComponent({
  name: "SearchResults",
  setup() {
    const { places, isLoadingPlaces, userLocation } = usePlacesStore();
    const { map, setPlaceMarkers, getRouteBetweenPoints } = useMapStore();
    const activePlace = ref("");

    watch(places, (newPlaces) => {
      activePlace.value = '';
      setPlaceMarkers(newPlaces);
    })

    return {
      places,
      isLoadingPlaces,
      activePlace,

      onPlaceClick: (place: Feature) => {

        activePlace.value = place.id;
        const [lng, lat] = place.center;

        map.value?.flyTo({
          center: [lng, lat],
          zoom: 15,
        });
      },
      getRouteDirections: (place: Feature) => {
        if(!userLocation.value) return;
        
        const [startLng, startLat] = userLocation.value;
        const [lng, lat] = place.center;

        const start: [number, number] = [startLng, startLat];
        const end: [number, number] = [lng, lat];

        getRouteBetweenPoints(start, end)
      }
    };
  },
});
