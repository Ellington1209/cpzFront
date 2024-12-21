import React from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  Grid2,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { TableData } from "./type/membro";
import { PatternFormat } from "react-number-format";
import Service from "../../shared/service";
import { useLoader } from "../../shared/contexts/LoaderProvider";

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (data: TableData) => void;
  memberData: TableData;
}

export function EditModal({
  open,
  handleClose,
  handleSave,
  memberData,
}: EditModalProps) {
  const [formData, setFormData] = React.useState<TableData>(memberData);
  const [errors, setErrors] = React.useState({
    name: false,
    nome_crente: false,
    telefone_celular: false,
    whatsapp: false,
  });
  const { showLoader, hideLoader } = useLoader();
  React.useEffect(() => {
    setFormData(memberData); // Atualiza os dados ao abrir o modal
  }, [memberData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handlePhoneChange = (values: { value: string }) => {
    const { value } = values;
    setFormData((prev) => ({ ...prev, telefone_celular: value }));
    setErrors((prev) => ({ ...prev, telefone_celular: false }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, whatsapp: value }));
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
        showLoader("Editando dados...");
        const response = await Service.update(formData.id, formData, "membros/update");
        handleSave(response.data); // Atualiza o estado com os dados atualizados
        handleClose();
        hideLoader(); 
      } catch (error) {
        hideLoader();
        console.error("Erro ao atualizar membro:", error);
      }
    } else {
      console.log("Preencha todos os campos obrigatórios.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Editar Membro
        </Typography>
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
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary"  onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
