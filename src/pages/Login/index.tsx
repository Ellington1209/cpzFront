import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Button,  
  Card,
  Grid2,
} from "@mui/material";
import { useState } from "react";
import Service from "../../shared/service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    // Validação dos campos
    let valid = true;
    let errorMessages = { email: "", password: "" };

    if (!email) {
      errorMessages.email = "Email é obrigatório";
      valid = false;
    }

    if (!password) {
      errorMessages.password = "Senha é obrigatória";
      valid = false;
    }

    setErrors(errorMessages);

    if (!valid) return;

    const payload = { email, password };
    try {
      const response = await Service.create(payload, "login");
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      navigate("/membros", { replace: true });
    } catch (error) {
      console.error("Erro ao logar:", error);
    }

  };

  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center' flexDirection='column' sx={{ background: "linear-gradient(180deg, #202020, #757575)" }}>
      <Box position='relative'>
        <Card>
          <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'
            sx={{
              maxWidth: 700, // Largura máxima
              minWidth: 200, // Largura mínima
              height: 300, // Altura adaptável ao conteúdo
              padding: 2, // Espaçamento interno

            }} >
            <Box
              padding={4}
              borderRadius="10px"
              position="absolute"
              sx={{
                top: '-75px', // Responsivo para ajustar a posição superior
                width: { xs: '90%', sm: '80%', md: '70%', lg: '580px' }, // Ajusta a largura dinamicamente
                maxWidth: '580px', // Largura máxima          
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center", // Centraliza o texto
                background: "linear-gradient(180deg, #202020, #757575)",
              }}
            >
              <img src="/logoCasaSemFundo.png" alt="Logo" width="150" height="150" style={{ margin: "-60px" }} />
            </Box>
            <Grid2 container spacing={3} >
              <Grid2 size={{ xs: 12, }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" })); // Limpa o erro ao digitar
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, }}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel error={!!errors.password} htmlFor="outlined-adornment-password">
                    Senha
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    size="small"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: "" })); // Limpa o erro ao digitar
                    }}
                    error={!!errors.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "Esconder senha" : "Exibir senha"}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Senha"
                  />
                </FormControl>
                {errors.password && (
                  <Typography variant="caption" color="error">
                    {errors.password}
                  </Typography>
                )}
              </Grid2>


              <Grid2 size={{ xs: 12, }}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleLogin}
                  sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    "&:hover": {
                      background: "#232424",
                    },
                    bgcolor: "#525353",
                  }}
                >
                  Entrar
                </Button>
                <Grid2 size={{ xs: 12, }} marginTop={2}>
                  {/* <Link
                    href="/register"
                    sx={{
                      textDecoration: "none",
                      color: "#f3eeeeb9",
                      fontSize: "14px",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Criar conta
                  </Link> */}
                </Grid2>
              </Grid2>
            </Grid2>

          </Box>
        </Card>
      </Box>
    </Box >
  );
}


{/* <Box width="100%" marginTop={1}>
<FormControl variant="outlined" fullWidth>
  <InputLabel error={!!errors.password} htmlFor="outlined-adornment-password">
    Senha
  </InputLabel>
  <OutlinedInput
    id="outlined-adornment-password"
    type={showPassword ? "text" : "password"}
    size="small"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    error={!!errors.password}
    endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label={showPassword ? "Esconder senha" : "Exibir senha"}
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    }
    label="Senha"
  />
</FormControl>
{errors.password && (
  <Typography variant="caption" color="error">
    {errors.password}
  </Typography>
)}
</Box>

<Box width="100%" marginTop={2}>
<Button
  variant="contained"
  fullWidth
  color="primary"
  onClick={handleLogin}
  sx={{
    textTransform: "none",
    fontSize: "16px",
    "&:hover": {
      background: "#232424",
    },
    bgcolor: "#525353",
  }}
>
  Entrar
</Button>
</Box>

<Box width="100%" marginTop={1}>
<Link
  href="/register"
  sx={{
    textDecoration: "none",
    color: "#f3eeeeb9",
    fontSize: "14px",
    "&:hover": { textDecoration: "underline" },
  }}
>
  Criar conta
</Link>
</Box> */}