import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { VisibilityRounded, VisibilityOffRounded } from "@mui/icons-material";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "../context/SnackbarContext";

interface LoginType {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();
  const axiosInstance = useAxios();
  const { openSnackbar } = useSnackbar();
  const { token, logout } = useAuth();

  const onSubmit = async (data: LoginType) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/login`, data);
      const token = response.data.token;
      const message = response.data.message;
      login(token);
      openSnackbar(message, "success");
    } catch (error: any) {
      openSnackbar(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "95vh",
      }}
    >
      {token ? (
        <>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            You are already logged in!
          </Typography>
          <Typography mb={2}>
            If you want to log in with a different account, you can
          </Typography>
          <Button variant="contained" onClick={logout}>
            Log out
          </Button>
        </>
      ) : (
        <>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            align="center"
            mb={5}
          >
            CAR MART
          </Typography>

          <Typography variant="h5" align="center">
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              label="Username"
              fullWidth
              margin="normal"
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <VisibilityOffRounded />
                      ) : (
                        <VisibilityRounded />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: "1rem", height: "3rem" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="primary" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default Login;
