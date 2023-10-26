import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    cities: [],
    city: '',
    location: {
      lat: '',
      lon: ''
    }
  },
  mutations: {
    SET_CITIES(state, cities) {
      state.cities = cities
    },
    SET_CITY(state, city) {
      state.city = city
    },
    SET_LOCATION(state, location) {
      state.location = location
    }
  },
  actions: {
    getCityInfo({ commit }, cityName) {
      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries/US/regions/CA/cities',
        params: {
          namePrefix: cityName
        },
        headers: {
          'X-RapidAPI-Key': process.env.VUE_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      }
      axios.request(options).then(response => {
        if(response.data.data && response.data.data.length > 0){
          commit('SET_CITIES', response.data.data),
          commit('SET_CITY', response.data.data[0].name),
          commit('SET_LOCATION', {
            lat: response.data.data[0].latitude,
            lon: response.data.data[0].longitude
          })
        }
        else{
          commit('SET_CITY', cityName)
          commit('SET_CITIES', [])
          commit('SET_LOCATION', null)
        }
      }).catch(error => {
        console.error(error)
      })
    }
  }
})

export default store