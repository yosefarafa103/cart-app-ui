import axios from "axios";
import { useState } from "react";
import TooManyRequests from "./TooManyRequests";

export default function Wrapper({ children }) {
  // Check If User Is Blocked for "Rate Limimting"
  const [error, setError] = useState(false);
  (async () => {
    try {
      await axios.get("http://localhost:5001/products");
    } catch (err) {
      if (err.status == 429) {
        setError(true);
      }
    }
  })();
  if (error) return <TooManyRequests />;
  return <div>{children}</div>;
}
