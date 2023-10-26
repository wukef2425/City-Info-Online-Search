<template>
  <h3>Brief Introduction of '{{ this.wikiData.title }}' from Wikipedia</h3>
  <div class="wiki-table">
    <el-table :data="tableData">
      <el-table-column prop="id" width="50px"></el-table-column>
      <el-table-column prop="summary"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      wikiData:{}
    }
  },
  computed: {
    tableData() {
      if (!this.wikiData.summary) {
        return [];
      }
      return Object.keys(this.wikiData.summary).map(key => ({
        id: Number(key) + 1,
        summary: this.wikiData.summary[key],
      }));
    },
  },
  watch: {
    '$store.state.city': {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.getWikiInfo(newVal)
        }
      }
    }
  },
  methods: {
    getWikiInfo(city) {
      const options = {
        method: 'GET',
        url: 'https://wiki-briefs.p.rapidapi.com/search',
        params: { 
          q: city
        },
        headers: {
          'X-RapidAPI-Key': process.env.VUE_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'wiki-briefs.p.rapidapi.com'
        }
      }
      axios.request(options).then(response => {
        this.wikiData = response.data
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
  .wiki-table {
    width: 1000px;
    margin: auto;
  }
</style>