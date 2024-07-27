// WebcamContext.tsx
"use client";
import React, { createContext, useContext, useState } from 'react';

interface WebcamContextType {
  webCamEnabled: boolean;
  setWebCamEnabled: (enabled: boolean) => void;
}

const WebcamContext = createContext<WebcamContextType | undefined>(undefined);

export const WebcamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  return (
    <WebcamContext.Provider value={{ webCamEnabled, setWebCamEnabled }}>
      {children}
    </WebcamContext.Provider>
  );
};

export const useWebcam = () => {
  const context = useContext(WebcamContext);
  if (context === undefined) {
    throw new Error('useWebcam must be used within a WebcamProvider');
  }
  return context;
};
