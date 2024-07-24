import { useState, useEffect } from "react";

export const useInitialRender = (): boolean => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  useEffect(() => {
    if (!initialRenderComplete) setInitialRenderComplete(true);
  }, [initialRenderComplete]);

  return initialRenderComplete;
};
