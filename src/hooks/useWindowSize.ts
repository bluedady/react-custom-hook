/*
    If you are trying to use this hook in the Next js project, 
    use "use client" keyword on the top of this page and set initial 0, 0
    values for the height and width respectively.
    like:

    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  Because it run first on the server and there is no window object available.
*/

import { useEffect, useState } from "react";

type WindowDimensions = {
  width: number;
  height: number;
};

const useWindowSize = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return (): void => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowDimensions;
};

export default useWindowSize;
