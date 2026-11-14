import { useState } from "react";

// Whether this borrower has set up the sensor for the artwork.
// Prototype only: remembered in this browser (localStorage).
// TODO: come from the sensor backend (is a sensor paired to this loan?).

const KEY = "artothek:sensor-setup";

export function isSensorSetUp(): boolean {
  try {
    return localStorage.getItem(KEY) === "done";
  } catch {
    return false;
  }
}

export function setSensorSetUp(done: boolean) {
  try {
    if (done) localStorage.setItem(KEY, "done");
    else localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function useSensorSetup() {
  const [done, setDone] = useState(isSensorSetUp);
  return {
    done,
    reset: () => {
      setSensorSetUp(false);
      setDone(false);
    },
  };
}
