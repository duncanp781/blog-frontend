import { useEffect, useState } from "react";

export function useJWT() {
  const [jwt, setJWT] = useState<string | null>(null);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setJWT(jwt);
    }
  }, []);
  return jwt;
}
