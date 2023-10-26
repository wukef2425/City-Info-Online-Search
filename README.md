# city_info_online_search

This platform integrates Google Maps, WeatherAPI, GeoDB Cities API and the Wikipedia search API to create a one-stop search engine for city-related information.

## System Requirements

- Node.js v21.0.0
- npm v10.2.1

## Project Setup

1. Install project dependencies:

```
npm install
```

2. Create a `.env` file in the root directory of your project with the following contents:

```
VUE_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VUE_APP_RAPID_API_KEY=your_rapid_api_key
```

Replace `your_google_maps_api_key` and `your_rapid_api_key` with your actual API keys.

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

## Deployment

After running `npm run build`, your application will be ready for deployment. The built files will be in the `dist/` directory.

To deploy the application, copy the contents of the `dist/` directory to your web server. 

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
