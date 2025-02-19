// app/api/analyze-mood/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";
import { WeatherData } from "../../../types/shared";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Weather API configuration
const WEATHER_API_BASE = "https://api.weather.gov";

async function getGridPoints(lat: number, lon: number) {
  try {
    const response = await axios.get(
      `${WEATHER_API_BASE}/points/${lat},${lon}`,
      {
        headers: {
          "User-Agent": "(your-website.com, contact@your-email.com)", // Replace with your info
          Accept: "application/geo+json",
        },
      }
    );
    return response.data.properties;
  } catch (error) {
    console.error("Error getting grid points:", error);
    throw new Error("Failed to get location data");
  }
}

async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  try {
    // First, get the grid points for the location
    const gridData = await getGridPoints(lat, lon);

    // Then, get the forecast using the grid endpoint
    const forecastResponse = await axios.get(gridData.forecast, {
      headers: {
        "User-Agent": "(damir.fun, damir.hara@gmail.com)", // Replace with your info
        Accept: "application/geo+json",
      },
    });

    const currentPeriod = forecastResponse.data.properties.periods[0];

    return {
      temperature: currentPeriod.temperature,
      description: currentPeriod.shortForecast,
      humidity: currentPeriod.relativeHumidity?.value || null,
      feelsLike: currentPeriod.temperature, // NWS API doesn't provide feels-like temp in basic forecast
      isDaytime: currentPeriod.isDaytime,
      windSpeed: currentPeriod.windSpeed,
    };
  } catch (error) {
    console.error("Weather API error:", error);
    throw new Error("Failed to fetch weather data");
  }
}

export async function POST(request: Request) {
  try {
    const { activity, latitude, longitude } = await request.json();

    // Validate coordinates are within US bounds
    if (
      latitude < 24.396308 ||
      latitude > 49.384358 ||
      longitude < -125.0 ||
      longitude > -66.93457
    ) {
      return NextResponse.json(
        { error: "Location must be within the United States" },
        { status: 400 }
      );
    }

    // Get weather data
    const weather = await getWeather(latitude, longitude);

    // Generate AI analysis
    const prompt = `
      Analyze a dog's mood and provide a brief, friendly summary (2-3 sentences) based on:
      
      Dog's current activity: ${activity}
      Current weather: ${weather.temperature}°F, ${weather.description}
      Wind: ${weather.windSpeed}
      Time of day: ${weather.isDaytime ? "Day" : "Night"}
      
      Consider how the weather might affect the dog's behavior and comfort. Make the response casual and fun.
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 150,
    });

    const analysis = completion.choices[0].message.content;

    return NextResponse.json({
      summary: analysis,
      weather: {
        temperature: weather.temperature,
        description: weather.description,
        windSpeed: weather.windSpeed,
        isDaytime: weather.isDaytime,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to analyze mood and weather" },
      { status: 500 }
    );
  }
}
