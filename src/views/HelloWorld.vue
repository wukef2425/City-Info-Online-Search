<template>
  <div>
    <h1 v-if="$store.state.city">
      Now Searching: {{ $store.state.city }}
    </h1>
  </div>
  <div>
    <input v-model="cityName" placeholder="Enter a city name or prefix" />
    <button @click="searchCity">
      Search
    </button>
  </div>
  <div>
    <button v-for="(city, index) in $store.state.cities" :key="index" @click="updateCityInfo(city)">{{ city.name }}</button>
  </div>
  <div v-if="$store.state.cities && $store.state.cities.length > 0">
    <WeatherComponent></WeatherComponent>
    <MapComponent></MapComponent>
    <WikiComponent></WikiComponent>
  </div>
  <div v-if="$store.state.city && $store.state.cities.length == 0">
    <MapComponent></MapComponent>
    <WikiComponent></WikiComponent>
  </div>
</template>

<script>
import WeatherComponent from '@/components/WeatherComponent.vue';
import WikiComponent from '@/components/WikiComponent.vue';
import MapComponent from '@/components/MapComponent.vue';

export default {
  components: {
    WeatherComponent,
    WikiComponent,
    MapComponent
},
  data() {
    return {
      cityName: ''
    }
  },
  methods: {
    searchCity() {
      this.$store.dispatch('getCityInfo', this.cityName)
    },
    updateCityInfo(city) {
      this.$store.commit('SET_CITY', city.name);
      this.$store.commit('SET_LOCATION', {
        lat: city.latitude,
        lon: city.longitude
      });
    }
  }
}
</script>

<style scoped>
  button {
    margin: 10px;
  }
</style>