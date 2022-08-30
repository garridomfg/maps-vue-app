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

    // Clear polyline
    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
      state.distance = undefined;
      state.duration = undefined;
    }
  },
  setRoutePolyline(state, coords: number[][]) {
    const start = coords[0];
    const end = coords[coords.length - 1];

    // Bounds
    const bounds = new mapboxgl.LngLatBounds(
      [start[0], start[1]],
      [start[0], start[1]]
    );

    // Add each point to the bounds
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    // Polyline
    const sourceData: Mapboxgl.AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourceData);

    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 3,
      },
    });
  },
};

export default mutation;
