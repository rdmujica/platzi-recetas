import React, { useEffect, useState } from "react";

const IfOffline = ({ children }) => {
  const [online, setOnline] = useState(navigator ? navigator.onLine : true);
  useEffect(() => {
    if (!window) return;
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);
  const goOnline = () => setOnline(true);
  const goOffline = () => setOnline(false);
  return online ? null : <span>{children}</span>;
};

export default IfOffline;
