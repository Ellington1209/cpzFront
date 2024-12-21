import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

// Define a interface para o contexto
interface SnackbarContextType {
  showMessage: (message: string, severity?: AlertColor) => void;
}

// Cria o contexto
const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

// Componente Provider
export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  // Função para exibir o snackbar
  const showMessage = (message: string, severity: AlertColor = "success") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  // Fecha o snackbar
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Hook para usar o contexto do Snackbar
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
