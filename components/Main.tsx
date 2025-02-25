"use client";

import Image from "next/image";

import ArtoPic from "../assets/arto-on-porch.jpg";
import Summary from "./Summary";

function Main() {
  return (
    <main className="flex flex-col items-center height-full mt-4 sm:items-center sm:gap-6 sm:py-4">
      Arto, a dog.
      <Image
        src={ArtoPic}
        alt="arto"
        className="w-90 mt-4 shadow-xl rounded-lg"
      />
      <Summary />
    </main>
  );
}

export default Main;
