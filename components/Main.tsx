import styles from "../styles/Home.module.css";
import homeStyles from "./Main.module.css";
import ArtoPic from "../assets/arto-on-porch.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";

function Main() {
  const [summary, setSummary] = useState<string | null>("");

  useEffect(() => {
    // Get analysis from Local Storage
    const savedSummary = localStorage.getItem("artoAnalysis");
    setSummary(savedSummary);
  }, []);

  return (
    <main className={styles.main}>
      Arto, a dog. The current update:
      {summary && (
        <div className="w-xl mt-4 p-4 bg-slate-100 rounded-lg border-1 border-slate-300 shadow-sm">
          {/* <h3 className="font-medium mb-2">Analysis:</h3> */}
          <p>{summary}</p>
        </div>
      )}
      <Image src={ArtoPic} alt="arto" className="w-100 shadow-xl rounded-lg absolute bottom-0" />
    </main>
  );
}

export default Main;
