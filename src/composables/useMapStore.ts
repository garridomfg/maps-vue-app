import { computed } from "vue";
import { useStore } from "vuex";
import { StateInterface } from "../store";
import Mapboxgl from "mapbox-gl";
import { Feature } from '../interfaces/places';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useMapStore = () => {
  const store = useStore<StateInterface>();

  return {
    map: computed(() => store.state.map.map),
    duration: computed(() => store.state.map.duration),
    distance: computed(() => store.state.map.distance),

    isMapReady: computed(() => store.getters['map/isMapReady']),

    // Mutations
    setMap: (map: Mapboxgl.Map) => store.commit("map/setMap", map),
    setPlaceMarkers: (places: Feature[]) => store.commit("map/setPlaceMarkers", places),

    // Actions
  };
};
