import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace('#','');
    if(hash){
        scroller.scrollTo(hash, {
          duration: 800,
          delay: 100,
          smooth: true,
          offset: -80,
        });
    }
  },[location]);

  return null;
};

export default ScrollToSection;
