import { useState, useEffect } from "react";
import { Select, MenuItem, FormHelperText, FormControl, InputLabel, CircularProgress } from "@mui/material";
import Service from "../../service";

interface Grupo {
    id: number;
    nome: string;
}

interface SelectGruposProps {
    value: number[]; // IDs dos grupos selecionados
    onChange: (selected: number[]) => void; // Callback para lidar com as mudanças
    label?: string; // Label opcional
}

export default function SelectGrupos({ value, onChange, label = "Selecione o grupo" }: SelectGruposProps) {
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGrupos = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await Service.get("grupo"); // Rota para buscar os grupos
                setGrupos(res.data);
            } catch (err) {
                setError("Erro ao carregar grupos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGrupos();
    }, []);

    const handleChange = (event: any) => {
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            {loading ? (
                <CircularProgress size={24} style={{ margin: "auto", display: "block" }} />
            ) : (
                <Select
                    multiple
                    size="small"
                    value={value}
                    onChange={handleChange}
                    renderValue={(selected) => 
                        grupos
                            .filter((grupo) => selected.includes(grupo.id))
                            .map((grupo) => grupo.nome)
                            .join(", ")
                    }
                >
                    {grupos.map((grupo) => (
                        <MenuItem key={grupo.id} value={grupo.id}>
                            {grupo.nome}
                        </MenuItem>
                    ))}
                </Select>
            )}
            {error && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
    );
}
