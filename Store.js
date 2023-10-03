import React, {createContext, useContext, useState} from 'react';

const GlobalStateContext = createContext();

export function GlobalStateProvider({children}) {
  const [globalWeather, setGlobalWeather] = useState({loaded: false});

  // ...

  return (
    <GlobalStateContext.Provider value={{globalWeather, setGlobalWeather}}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalWeather() {
  return useContext(GlobalStateContext);
}
