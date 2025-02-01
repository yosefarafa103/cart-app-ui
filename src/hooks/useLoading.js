import { useEffect, useState } from "react";

export function useLoading(currentTime = 3) {
  const [delay, setDelay] = useState(currentTime);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    if (delay > 0 && isClicked) {
      setTimeout(() => {
        setDelay(delay - 1);
      }, 1000);
    }
  }, [setDelay, delay, isClicked]);
  return { delay, setDelay, setIsClicked, isClicked };
}
