import styles from "../styles/Home.module.css";
import homeStyles from "./Main.module.css";
import ArtoPic from "../assets/arto-on-porch.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { WeatherData } from "../types/shared";

const isLocationInUS = (lat: number, lon: number) => {
  return (
    lat >= 24.396308 && lat <= 49.384358 && lon >= -125.0 && lon <= -66.93457
  );
};

function Main() {
  const [dogActivity, setDogActivity] = useState("");
  const [summary, setSummary] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
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

  const analyzeDogMood = async (activity) => {
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
      console.error("Error analyzing mood:", error);
      return "Unable to analyze mood at this time.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dogActivity.trim()) {
      return;
    }
    console.log("Analyzing mood...");

    setLoading(true);
    const analysis = await analyzeDogMood(dogActivity);
    setSummary(analysis);
    setLoading(false);
  };

  return (
    <main className={styles.main}>
      Arto, a dog.
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="activity" className="block text-sm font-medium">
          What is your dog doing right now?
        </label>
        <input
          type="text"
          id="activity"
          placeholder="What is Arto doing?"
          value={dogActivity}
          onChange={(e) => setDogActivity(e.target.value)}
        />
      </form>
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading || !dogActivity.trim()}
      >
        {loading ? "Analyzing..." : "Analyze Mood"}
      </button>
      {weather && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
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
      {summary && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
          <h3 className="font-medium mb-2">Analysis:</h3>
          <p>{summary}</p>
        </div>
      )}
      <Image src={ArtoPic} alt="arto" className={homeStyles.artoPic} />
    </main>
  );
}

export default Main;
