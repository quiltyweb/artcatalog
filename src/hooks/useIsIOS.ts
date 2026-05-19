import { useEffect, useState } from "react";

export function useIsIOS(): boolean | null {
  const [isIOS, setIsIOS] = useState<boolean | null>(null);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/i.test(navigator.userAgent));
  }, []);

  return isIOS;
}
