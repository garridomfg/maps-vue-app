import { MutationTree } from "vuex";
import { MapState } from "./state";
import Mapboxgl from "mapbox-gl";
import { Feature } from "../../interfaces/places";
import mapboxgl from "mapbox-gl";

const mutation: MutationTree<MapState> = {
  setMap(state, map: Mapboxgl.Map) {
    state.map = map;
  },
  setPlaceMarkers(state, places: Feature[]) {
    state.markers.forEach((marker) => marker.remove());
    state.markers = [];

    if (!state.map) return;

    for (const place of places) {
      const [lng, lat] = place.center;

      const popup = new mapboxgl.Popup({
        closeButton: false,
      }).setLngLat([lng, lat]).setHTML(`
                <h6>${place.text}</h6>
                <p>${place.place_name}</p>
              `);

      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(state.map);

      state.markers.push(marker);
    }
  },
};

export default mutation;
