import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { AppThemeProvider } from "./shared/contexts"
import { CssBaseline } from "@mui/material"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SnackbarProvider } from "./shared/contexts/SnackbarProvider";
import { LoaderProvider } from "./shared/contexts/LoaderProvider";





export const App = () => {


  return (
    <AppThemeProvider>
      <CssBaseline />{/* Aplica o CSS reset globalmente */}
      <SnackbarProvider>
        <LoaderProvider>
          <ToastContainer />

          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </LoaderProvider>
      </SnackbarProvider>
    </AppThemeProvider>
  )
}


