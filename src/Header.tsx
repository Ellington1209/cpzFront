import React from "react";
import { Box } from "@mui/material";
import { AppBarMenu } from "./shared/components";

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <AppBarMenu>
      <Box sx={{ padding: 0, margin: 0 }}>
        {children}
      </Box>
    </AppBarMenu>
  );
};

export default Header;
