export interface Location {
  id: number // Open-Meteo location ID (for identifying search results)
  name: string
  latitude: number // Used in URL generation for precise location lookup
  longitude: number // Used in URL generation for precise location lookup
  timezone: string
  admin1?: string
  country: string
  display: string // Formatted display string like "Enterprise, Alabama, United States"
}

export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  timezone: string
  current: {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    precipitation: number
    weather_code: number
    wind_speed_10m: number
    wind_direction_10m: number
    wind_gusts_10m: number
    uv_index: number
    visibility: number
    pressure_msl: number
    dew_point_2m: number
    cloud_cover: number
    rain: number
    showers: number
    snowfall: number
    snow_depth: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    apparent_temperature: number[]
    precipitation_probability: number[]
    weather_code: number[]
    wind_speed_10m: number[]
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    apparent_temperature_max: number[]
    apparent_temperature_min: number[]
    precipitation_probability_max: number[]
    sunrise: string[]
    sunset: string[]
    uv_index_max: number[]
  }
}

export interface AirQualityResponse {
  latitude: number
  longitude: number
  timezone: string
  current: {
    time: string
    us_aqi: number
    pm2_5: number
    pm10: number
    european_aqi: number
  }
}

export interface OpenMeteoGeocodeResult {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation?: number
  timezone: string
  feature_code: string
  country_code: string
  country: string
  admin1?: string
  admin2?: string
  admin3?: string
  admin4?: string
  population?: number
}

export interface OpenMeteoGeocodeResponse {
  results: OpenMeteoGeocodeResult[]
  generationtime_ms: number
}

export interface WeatherQueryParams {
  latitude: number
  longitude: number
  units: 'metric' | 'imperial'
}

export interface LocationQueryParams {
  city: string
  count: number
}

export type WeatherCardBlockProps = {
  location: Location
}
