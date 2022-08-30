import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.VUE_APP_MAPS_API_KEY;

if(!navigator.geolocation) {
    alert('Your browser does not support Geolocation')
    throw new Error('Your browser does not support Geolocation')
}

createApp(App).use(store).use(router).mount('#app')
