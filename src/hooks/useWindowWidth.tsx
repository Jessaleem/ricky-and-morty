import { useState, useEffect } from "react";

export function useWindowWidth() {
  const [width, setwidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setwidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width };
}
