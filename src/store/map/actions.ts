import { ActionTree } from "vuex";
import { MapState } from "./state";
import { StateInterface } from "../index";
import { DirectionsResponse } from "../../interfaces/directions";
import directionsApi from "../../api/directionsApi";

export type LngLat = [number, number];

const actions: ActionTree<MapState, StateInterface> = {
  async getRouteBetweenPoints(
    { commit },
    { start, end }: { start: LngLat; end: LngLat }
  ) {
    const { data } = await directionsApi.get<DirectionsResponse>(
      `${start.join(",")};${end.join(",")}`
    );
    commit("setRoutePolyline", data.routes[0].geometry.coordinates);
  },
};

export default actions;
