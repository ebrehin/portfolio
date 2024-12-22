import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Créer un contexte de navigation personnalisé
const NavigationContext = createContext({
  handleCustomNavigation: () => {}
});

// Fournisseur de contexte
export function NavigationProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [nextPath, setNextPath] = useState(null);

  const handleCustomNavigation = (path) => {
    if (location.pathname !== path) {
      setNextPath(path);
      return true; // Indique que la navigation peut être déclenchée
    }
    return false;
  };

  const completeNavigation = () => {
    if (nextPath) {
      navigate(nextPath);
      setNextPath(null);
    }
  };

  return (
    <NavigationContext.Provider value={{ 
      handleCustomNavigation, 
      completeNavigation 
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte de navigation
export const useCustomNavigation = () => {
  return useContext(NavigationContext);
};