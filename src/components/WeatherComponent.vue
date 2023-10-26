<template>
  <div v-if="this.weatherData">
    <h3>Weather in {{ weatherLocation.name }}, {{ weatherLocation.country }}</h3>
    <div>
    <p>Last updated: {{ weatherData.last_updated }}</p>
    <p>Ultraviolet Index: {{ weatherData.uv }}</p>
    <p>Temperature: {{ temperature }} {{ tempUnit }}
      <button @click="toggleTempUnit">{{ tempToggleText }}</button>
    </p>
    <p>Wind Speed: {{ windSpeed }} {{ speedUnit }}
      <button @click="toggleSpeedUnit">{{ speedToggleText }}</button>
    </p>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      weatherLocation: {},
      weatherData: {},
      tempUnit: '°F',
      speedUnit: 'mph',
    };
  },
  computed: {
    temperature() {
      return this.tempUnit === '°C' ? this.weatherData.temp_c : this.weatherData.temp_f;
    },
    windSpeed() {
      return this.speedUnit === 'kph' ? this.weatherData.wind_kph : this.weatherData.wind_mph;
    },
    tempToggleText() {
      return `Switch to ${this.tempUnit === '°C' ? '°F' : '°C'}`;
    },
    speedToggleText() {
      return `Switch to ${this.speedUnit === 'kph' ? 'mph' : 'kph'}`;
    },
  },
  watch: {
    '$store.state.city': {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.getWeatherInfo(newVal)
        }
      }
    }
  },
  methods: {
    getWeatherInfo(city) {
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: { 
          q: city
        },
        headers: {
          'X-RapidAPI-Key': process.env.VUE_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      }
      axios.request(options).then(response => {
        this.weatherData = response.data.current
        this.weatherLocation = response.data.location
      }).catch(error => {
        console.error(error)
      })
    },
    toggleTempUnit() {
      this.tempUnit = this.tempUnit === '°C' ? '°F' : '°C';
    },
    toggleSpeedUnit() {
      this.speedUnit = this.speedUnit === 'kph' ? 'mph' : 'kph';
    },
  }
}
</script>
