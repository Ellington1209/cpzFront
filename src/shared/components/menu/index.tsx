import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Sun, Moon } from "lucide-react";
import { useAppThemeContext } from "../../contexts";
import SideMenu from "./SideMenu"; // Importando o SideMenu
import { ExitToApp } from "@mui/icons-material";
import { useTheme } from "@mui/material";

interface PrimarySearchAppBarProps {
  children: React.ReactNode;
}

const AppBarMenu: React.FC<PrimarySearchAppBarProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();


  const { toggleTheme, themeName } = useAppThemeContext();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleLogout = () => {
    // Remove o token e os dados do usuário do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  
    // Redireciona para a página de login
    window.location.href = "/login"; // Altere o caminho conforme necessário
  };



  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Menu Lateral */}
      <SideMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} onToggle={handleMenuToggle} />

      {/* Barra Superior */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenuToggle}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
            >
              Igreja Casa de paz
            </Typography>

            {/* Botão de Alternar Tema */}
            <IconButton onClick={toggleTheme} color="inherit">
              {themeName === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </IconButton>
            <IconButton onClick={handleLogout} color="inherit">
                <ExitToApp sx={{color: theme.palette.primary.contrastText}}/>
            </IconButton>
          </Toolbar>
        </AppBar>

   

        {/* Conteúdo Principal */}
        <Box sx={{ padding: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AppBarMenu;
