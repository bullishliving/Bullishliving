// hooks/usePaystack.ts
import { useEffect, useState } from "react";

export function usePaystackScript() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // If already loaded, skip
    if (document.getElementById("paystack-script")) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.id = "paystack-script";
    script.async = true;

    script.onload = () => {
      setLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Paystack script.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return loaded;
}
