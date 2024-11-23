"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function TopLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    const handleRouteChange = () => {
      handleStart();
      setTimeout(handleComplete, 500);
    };

    handleRouteChange();

    return () => {
      // Clean up listeners if component unmounts
    };
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={loading ? 50 : 100}
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-primary animate-pulse"
    >
      <div
        className="h-full bg-primary-foreground transition-all duration-300 ease-in-out"
        style={{ width: loading ? "90%" : "100%" }}
      ></div>
    </div>
  );
}
