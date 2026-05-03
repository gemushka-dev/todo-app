import { useEffect, useState } from "react";

export const useAuth = () => {
  const [sharedData, setSharedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3500/me", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setSharedData(data);
        }
      } catch (error) {
        console.log(`Auth error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return {
    sharedData,
    isLoading,
  };
};
