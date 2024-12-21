import React, { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Collapse,
    IconButton,
    useTheme,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface CollapsePaperProps {
    title: string; // Título exibido no cabeçalho do colapso
    description?: string; // Descrição opcional abaixo do título
    children: React.ReactNode; // Conteúdo a ser exibido ao expandir
    defaultExpanded?: boolean; // Define se estará expandido por padrão
}

export const CollapsePaper: React.FC<CollapsePaperProps> = ({
    title,
    description,
    children,
    defaultExpanded = false,
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const toggleCollapse = () => {
        setIsExpanded((prev) => !prev);
    };
    const theme = useTheme();
    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}  >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="h6">{title}</Typography>
                    {description && (
                        <Typography variant="body2" color="textSecondary">
                            {description}
                        </Typography>
                    )}
                </Box>
                <IconButton onClick={toggleCollapse} size="small">
                    {isExpanded ? <ExpandLess  sx={{                           
                                color: theme.palette.text.primary, // Cor do tema
                            }} /> : <ExpandMore  sx={{                                
                                color: theme.palette.text.primary, // Cor do tema
                            }} />}
                </IconButton>
            </Box>
            <Collapse in={isExpanded}>
                <Box mt={2}>{children}</Box>
            </Collapse>
        </Paper>
    );
};
