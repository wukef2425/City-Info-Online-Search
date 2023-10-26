<template>
  <h3>Google Map</h3>
  <div>
    <iframe v-if="$store.state.location"
      width="600" 
      height="450" 
      frameborder="0" 
      style="border:0" 
      :src="mapViewUrl" 
      allowfullscreen>
    </iframe>
    <iframe v-if="$store.state.city"
      width="600" 
      height="450" 
      frameborder="0" 
      style="border:0" 
      :src="mapPlaceUrl" 
      allowfullscreen>
    </iframe>
  </div>
</template>
  
<script>
const googleKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;
export default {
  computed: {
    mapViewUrl() {
      console.log(this.$store.state.location)
      const { lat, lon } = this.$store.state.location;
      return `https://www.google.com/maps/embed/v1/view?key=${googleKey}
              &center=${lat},${lon}
              &zoom=12
              &maptype=satellite`;
    },
    mapPlaceUrl() {
      const place = this.$store.state.city;
      return `https://www.google.com/maps/embed/v1/place?key=${googleKey}
              &q=${place}`;
    }
  }
}
</script>