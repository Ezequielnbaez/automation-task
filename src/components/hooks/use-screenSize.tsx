import { useState, useEffect } from "react";

interface ScreenSize {
  width: number;
  height: number;
  isCollapsed: boolean;
}

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 1000,
    height: 700,
    isCollapsed: false,
  });

  useEffect(() => {
    const handleResize = () => {
        if (innerWidth < 650) {
          setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
            isCollapsed: true,
          });
        } else {
          setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
            isCollapsed: false,
          });
        }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
