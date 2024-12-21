import React from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, useTheme, Typography, } from "@mui/material";
import { Link } from "react-router-dom";
import { Diversity3, WhatsApp } from "@mui/icons-material";


interface SideMenuProps {
    open: boolean;
    onClose: () => void;
    onToggle: () => void;
}

const NAVIGATION = [
    { title: "Membros", icon: <Diversity3/>, path: "/membros" },
    { title: "Mensagens", icon: <WhatsApp />, path: "mensagens/whatssap" },
  
];

const SideMenu: React.FC<SideMenuProps> = ({ open,  onToggle }) => {
    const theme = useTheme(); // Acessando o tema ativo

    return (
        <Drawer
            variant="permanent"
            open={open}
          
            sx={{
                width: open ? 240 : 60,               
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: open ? 240 : 60,
                    boxSizing: "border-box",
                    transition: "width 0.3s",
                    backgroundColor: theme.palette.background.paper,
                },
            }}
        >
            {/* Header do Drawer */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px" }}>
                {open && <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>Menu</Typography>}
                <IconButton onClick={onToggle}>{open ? <></> : <img src="/logoCasaSemFundo.png" alt="Logo" width="50" height="50" style={{ marginLeft: "-10px" }} />}</IconButton>
            </Box>

            {/* Lista de Navegação */}
            <List>
                {NAVIGATION.map((item, index) => (
                    <ListItem disablePadding key={index}>
                        <ListItemButton
                            component={Link} // Usando Link do react-router-dom
                            to={item.path} // Definindo o caminho da rota
                            sx={{
                                textDecoration: "none",
                                color: theme.palette.text.primary, // Cor do tema
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: theme.palette.text.primary, // Aplicando a cor do tema
                                }}
                            >
                                {React.cloneElement(item.icon, { color: theme.palette.text.primary })}
                            </ListItemIcon>
                            {open && <ListItemText primary={item.title} />}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default SideMenu;
