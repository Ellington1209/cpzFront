import React, { createContext, useContext, useState, ReactNode } from "react";
import { Backdrop, CircularProgress, Typography, useTheme } from "@mui/material";

// Interface do contexto
interface LoaderContextType {
  showLoader: (message: string) => void;
  hideLoader: () => void;
}

// Criação do contexto
const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

// Componente Provider
export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const theme = useTheme();

  // Função para exibir o loader
  const showLoader = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  // Função para esconder o loader
  const hideLoader = () => {
    setOpen(false);
    setMessage("");
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      <Backdrop
        open={open}
        sx={{
          color: theme.palette.text.primary,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="inherit" />
        {message && (
          <Typography
            variant="h6"
            sx={{ marginLeft: 2, color: theme.palette.text.primary }}
          >
            {message}
          </Typography>
        )}
      </Backdrop>
    </LoaderContext.Provider>
  );
};

// Hook para usar o contexto do loader
export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader deve ser usado dentro de um LoaderProvider");
  }
  return context;
};
