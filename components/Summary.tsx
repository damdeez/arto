import { useEffect, useState } from "react";

function Summary() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>("");

  useEffect(() => {
    // Get analysis from Local Storage
    // const savedSummary = localStorage.getItem("artoAnalysis");
    // setSummary(savedSummary);
    setLoading(true);
    async function fetchStatus() {
      const res = await fetch("/api/get-latest-status", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setSummary(data.latestStatus);
        setLoading(false);
      }
    }

    fetchStatus();
  }, []);

  return (
    <div className="max-w-90 w-100% p-4 mt-4 bg-slate-50 rounded-lg border-1 border-slate-200">
      {loading ? (
        "Loading status..."
      ) : (
        <>
          <h3 className="font-medium mb-2">The current Arto update:</h3>
          <p>{summary}</p>
        </>
      )}
    </div>
  );
}

export default Summary;
