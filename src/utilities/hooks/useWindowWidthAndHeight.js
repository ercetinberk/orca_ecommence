// CustomHooks.js
import { useState, useEffect } from 'react';
export default function useWindowWidthAndHeight() {

    const hasWindow = typeof window !== 'undefined';
  
    function getWindowDimensions() {
      const width = hasWindow ? window.innerWidth : null;
      const height = hasWindow ? window.innerHeight : null;
      return {
        width,
        height,
      };
    }
  
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      if (hasWindow) {
        console.log('change width');
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
  
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    }, [hasWindow]);
  
    return windowDimensions;
  }
  