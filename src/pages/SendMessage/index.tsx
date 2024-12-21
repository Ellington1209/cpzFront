import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useTheme,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile"; // Ícone do clipe
import { useSnackbar } from "../../shared/contexts/SnackbarProvider";
import { useLoader } from "../../shared/contexts/LoaderProvider";
import Service from "../../shared/service";

export default function SendMessage() {
  const { showMessage } = useSnackbar();
  const { showLoader, hideLoader } = useLoader();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null); // Estado para o arquivo anexado
   const theme = useTheme();
  const maxCharacters = 1000; // Limite de caracteres

  const handleSendMessage = async () => {

  
    try {
      setLoading(true);
      showLoader("Enviando mensagem...");
  
      const formData = new FormData();
      formData.append("message", message);
  
      if (attachment) {
        formData.append("media", attachment); // Campo para o arquivo anexado
        formData.append("fileName", attachment.name); // Nome do arquivo
        formData.append("mediaType", attachment.type.split("/")[0]); // Tipo do arquivo (image, video)
  
        const response = await Service.create(formData, "whatsapp/send-media")
  
        if (response.success) {
          showMessage("Mensagem com mídia enviada com sucesso!", "success");
        } else {
          throw new Error(response.message || "Erro ao enviar mensagem de mídia.");
        }
      } else {
        const response = await Service.create({ message }, "whatsapp/send-text");
  
        if (response.success) {
          showMessage("Mensagem enviada com sucesso!", "success");
        } else {
          throw new Error(response.message || "Erro ao enviar mensagem.");
        }
      }
  
      // Limpar campos após sucesso
      setMessage("");
      setAttachment(null);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.details ||
        error.response?.data?.message ||
        "Erro ao enviar mensagem. Tente novamente.";
      showMessage(errorMessage, "error");
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachment(event.target.files[0]);
      showMessage("Arquivo anexado com sucesso!", "success");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" bgcolor="background.default" marginTop={20}>
      <Paper elevation={5} sx={{ p: 4, width: "100%", maxWidth: 800 }}>
        <Typography variant="h5" mb={2} color="text.primary">
          Enviar Mensagem no WhatsApp
        </Typography>
        <Typography variant="body2" mb={2} color="text.secondary">
          Digite a mensagem que será enviada para todos os membros cadastrados no sistema. Você pode anexar uma imagem ou vídeo.
        </Typography>
        <Box sx={{ position: "relative", mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={5}
            label="Mensagem"
            placeholder="Escreva sua mensagem aqui..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            helperText={`${message.length}/${maxCharacters} caracteres`}
            inputProps={{ maxLength: maxCharacters }}
          />
          <IconButton
            component="label"
            sx={{ position: "absolute", top: "8px", right: "8px",  }}
          >
           <AttachFileIcon sx={{ color: theme.palette.primary.contrastText }} />

            <input
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={handleAttachmentChange}
            />
          </IconButton>
        </Box>
        {attachment && (
          <Typography variant="body2" color="text.secondary" mb={2}>
            Arquivo anexado: {attachment.name}
          </Typography>
        )}
        <Box >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}           
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
