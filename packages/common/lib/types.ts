export interface WeatherType {
  time: Date;
  precipitation: number;
  temperature: number;
}

export interface GeoType {
  lat: number;
  lng: number;
  address: string;
  timezoneID: string;
}
