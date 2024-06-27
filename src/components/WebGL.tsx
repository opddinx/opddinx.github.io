import React, { useEffect, useRef } from "react";
import EventBus from "../js/utils/EventBus";
import WebGL from "../js/modules/WebGL";

interface WebGlProps {}

const WebGl: React.FC<WebGlProps> = () => {
  const webglRef = useRef<WebGL>(null);

  useEffect(() => {
    // Initialize WebGL only after the component mounts
    webglRef.current = new WebGL({
      $wrapper: document.body,
    });
  }, []);

  return null;
};

export default WebGl;
