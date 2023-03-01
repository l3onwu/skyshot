export interface WeatherType {
  time: Date;
  rain: number;
  snowfall: number;
  temperature: number;
}

export interface GeoType {
  lat: number;
  lng: number;
  address: string;
  timezoneID: string;
}
