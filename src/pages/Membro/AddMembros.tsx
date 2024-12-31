import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid2,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { TableData } from "./type/membro";
import { SelectChangeEvent } from "@mui/material"; // Importar o tipo correto para Select
import Service from "../../shared/service";
import { useSnackbar } from "../../shared/contexts/SnackbarProvider";
import { PatternFormat } from "react-number-format";
import { useLoader } from "../../shared/contexts/LoaderProvider";

interface AddMembrosProps {
    handleGetMembros: () => void; 
  }

  export function AddMembros({ handleGetMembros }: AddMembrosProps) {
  const { showMessage } = useSnackbar();
  const { showLoader, hideLoader } = useLoader();
  const [formData, setFormData] = useState<TableData>({
    id: "",
    name: "",
    nome_crente: "",
    telefone_celular: "",
    whatsapp: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    nome_crente: false,
    telefone_celular: false,
    whatsapp: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Atualiza os dados do formulário
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Remove o erro do campo ao começar a digitar novamente
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handlePhoneChange = (values: { value: string }) => {
    const { value } = values;

    // Atualiza o campo de telefone
    setFormData((prev) => ({ ...prev, telefone_celular: value }));

    // Remove o erro ao começar a digitar novamente
    setErrors((prev) => ({ ...prev, telefone_celular: false }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;

    // Atualiza o campo WhatsApp
    setFormData((prev) => ({ ...prev, whatsapp: value }));

    // Remove o erro do campo WhatsApp ao mudar a seleção
    setErrors((prev) => ({ ...prev, whatsapp: false }));
  };

  const validateFields = () => {
    const newErrors = {
      name: !formData.name?.trim(),
      nome_crente: !formData.nome_crente?.trim(),
      telefone_celular: !formData.telefone_celular?.trim(),
      whatsapp: !formData.whatsapp?.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        showLoader("Salvando dados...");
        await Service.create(formData, "membros/create");
        showMessage("Operação realizada com sucesso!", "success");
        setFormData({
          id: "",
          name: "",
          nome_crente: "",
          telefone_celular: "",
          whatsapp: "",
        }); // Limpa o formulário
        hideLoader();
        handleGetMembros()
      } catch (error) {
        showMessage("Ocorreu um erro ao criar novo contato!", "error");
      }
    } else {
      showMessage("Preencha todos os campos obrigatórios.", "error");
    }
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 3, xl: 3 }}>
          <TextField
            fullWidth
            label="Nome"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            error={errors.name}
            helperText={errors.name ? "Este campo é obrigatório." : ""}
            size="small"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 3, xl: 3 }}>
          <TextField
            fullWidth
            label="Nome de Crente"
            name="nome_crente"
            value={formData.nome_crente || ""}
            onChange={handleChange}
            error={errors.nome_crente}
            helperText={errors.nome_crente ? "Este campo é obrigatório." : ""}
            size="small"
          />
        </Grid2>

        <Grid2 size={{ xs: 6, lg: 3, xl: 3 }}>
          <PatternFormat
            label="Telefone"
            format="(##) # ####-####"
            mask="_"
            size="small"
            customInput={TextField}
            fullWidth
            value={formData.telefone_celular || ""}
            onValueChange={handlePhoneChange}
            error={errors.telefone_celular}
            helperText={
              errors.telefone_celular ? "Este campo é obrigatório." : ""
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6, lg: 3, xl: 3 }}>
          <FormControl fullWidth size="small" error={errors.whatsapp}>
            <InputLabel>WhatsApp</InputLabel>
            <Select
              value={formData.whatsapp || ""}
              onChange={handleSelectChange}
              label="WhatsApp"
            >
              <MenuItem value="S">Sim</MenuItem>
              <MenuItem value="N">Não</MenuItem>
            </Select>
            {errors.whatsapp && (
              <Box mt={1} color="error.main" fontSize="0.75rem">
                Este campo é obrigatório.
              </Box>
            )}
          </FormControl>
        </Grid2>
      </Grid2>
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
