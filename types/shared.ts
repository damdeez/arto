export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number | null;
  feelsLike: number;
  isDaytime: boolean;
  windSpeed: string;
}