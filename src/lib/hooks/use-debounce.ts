import { useEffect, useState } from "react";

export const useDebounce = <T, R>(
  data: T,
  handler: (data: T) => R,
  time: number
): R | undefined => {
  const [result, setResult] = useState<R>();
  useEffect(() => {
    const timeout = setTimeout(() => setResult(handler(data)), time);
    return () => clearTimeout(timeout);
  }, [JSON.stringify(data)]);
  return result;
};
