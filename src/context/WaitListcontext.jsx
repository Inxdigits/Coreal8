import React, { createContext, useContext, useState } from "react";

const WaitlistContext = createContext();

export const WaitlistProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openWaitlist = () => setIsOpen(true);
  const closeWaitlist = () => setIsOpen(false);

  return (
    <WaitlistContext.Provider value={{ isOpen, openWaitlist, closeWaitlist }}>
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => useContext(WaitlistContext);
