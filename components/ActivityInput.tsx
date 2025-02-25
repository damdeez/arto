"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { WeatherData } from "../types/shared";
import "../styles/globals.css";
import Summary from "./Summary";

const isLocationInUS = (lat: number, lon: number) => {
  return (
    lat >= 24.396308 && lat <= 49.384358 && lon >= -125.0 && lon <= -66.93457
  );
};

function ActivityInput() {
  const [dogActivity, setDogActivity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          if (isLocationInUS(lat, lon)) {
            setLocation({ latitude: lat, longitude: lon });
            setErrorMessage("");
          } else {
            setErrorMessage(
              "This app only works with locations in the United States."
            );
          }
        },
        () => {
          setErrorMessage(
            "Unable to get your location. Please enable location services."
          );
        }
      );
    }
  }, []);

  const analyzeDogMood = async (activity: string) => {
    try {
      const response = await fetch("/api/analyze-mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activity,
          ...(location || {}),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze mood");
      }

      const data = await response.json();
      setWeather(data.weather);
      return data.summary;
    } catch (error) {
      return "Unable to analyze mood at this time.";
    }
  };

  const addMoodStatus = async (status: string) => {
    try {
      const response = await fetch("/api/set-latest-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add mood to DB at this time.");
      }
    } catch (error) {
      return "Unable to add mood to DB at this time.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dogActivity.trim()) {
      return;
    }

    setLoading(true);
    const analysis = await analyzeDogMood(dogActivity);
    // Set the analysis to Local Storage
    localStorage.setItem("artoAnalysis", analysis);
    // add to database
    addMoodStatus(analysis);
    setLoading(false);
    setDogActivity("");
  };

  return (
    <main className="flex flex-col gap-2 p-8 sm:items-center sm:gap-6 sm:py-4">
      <Link href="/" className="text-xs font-bold">
        &#9664; BACK
      </Link>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-col">
        <label htmlFor="activity" className="mb-2 block text-lg font-medium">
          What is Arto doing right now?
        </label>
        <div className="flex flex-col gap-4">
          <textarea
            className="flex h-100 p-4 rounded-lg border-2 border-slate-300 shadow-xs text-3xl text-wrap focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            id="activity"
            value={dogActivity}
            onChange={(e) => setDogActivity(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 hover:cursor text-white font-small py-2 px-2 rounded-lg cursor-pointer"
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !dogActivity.trim()}
          >
            {loading ? "Analyzing..." : "Analyze Mood"}
          </button>
        </div>
      </form>
      {weather && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 mr-2">
              {/* <Thermometer className="h-5 w-5" /> */}
              <span>{weather.temperature}°F</span>
            </div>
            <div className="flex items-center space-x-2">
              {/* <Cloud className="h-5 w-5" /> */}
              <span className="capitalize">{weather.description}</span>
            </div>
          </div>
        </div>
      )}
      <Summary />
    </main>
  );
}

export default ActivityInput;
