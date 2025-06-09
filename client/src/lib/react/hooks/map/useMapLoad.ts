import { useState } from "react";

export const useMapLoad = () => {
  const [isLoaded, _setIsLoaded] = useState(false);

  const onLoad = () => {
    _setIsLoaded(true);
  };

  return { isLoaded, onLoad };
};
