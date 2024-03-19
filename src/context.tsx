import { createContext, ReactNode, useContext, useState } from "react";

type AppContextType = {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ setIsFormOpen, isFormOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a AppProvider");
  }
  return context;
};
