import { ActionTree } from "vuex";
import { PlacesState } from "./state";
import { StateInterface } from "../index";
import searchApi from '../../api/searchApi';
import { PlacesResponse, Feature } from '../../interfaces/places';

const actions: ActionTree<PlacesState, StateInterface> = {
  getInitialLocation({ commit }) {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        commit("setLngLat", {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        }),
      (err) => {
        console.error(err);
        throw new Error("Geolocation not been found");
      }
    );
  },
  async searchPlacesByTerm({ commit, state }, query: string): Promise<Feature[]> {
    if(query.length === 0) {
      commit('setPlaces', []);
      return [];
    }

    if(!state.userLocation) throw new Error('There is no user location');

    commit('setIsLoadingPlaces');
    const { data } = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation?.join(","),
      },
    });
    commit('setPlaces', data.features);
    return data.features;
  },
};

export default actions;
