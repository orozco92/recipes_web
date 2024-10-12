import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { blue } from "@mui/material/colors";
import { signup } from "../../services/auth";
import { SignUpDto } from "../../core/interfaces";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const dto = Object.fromEntries(formData) as unknown as SignUpDto;

    signup(dto)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        if (err && err.validationErrors) {
          const e: Record<string, string> = {};
          for (const [key, value] of Object.entries<Record<string, string>>(
            err.validationErrors
          )) {
            e[key] = Object.values(value).join(", ");
          }
          setErrors(e);
        }
      });
  };

  const handleCancel = () => navigate(-1);

  return (
    <Container maxWidth={"xs"} sx={{ mt: "64px" }}>
      <form onSubmit={handleSubmit}>
        <Stack gap={"1rem"}>
          <Avatar
            alt="sign up icon"
            sx={{ alignSelf: "center", bgcolor: blue["700"] }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" alignSelf={"center"}>
            Sign Up
          </Typography>
          <Typography variant="body2" alignSelf={"center"}>
            Welcome user, please sign up to continue
          </Typography>
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            error={!!errors["email"]}
            helperText={errors["email"]}
          />
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            error={!!errors["username"]}
            helperText={errors["username"]}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            error={!!errors["password"]}
            helperText={errors["password"]}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="repeatPassword"
            name="repeatPassword"
            label="Repeat password"
            type={showRepeatPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRepeatPassword}
                      edge="end"
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="inherit"
            disableElevation
          >
            Sign Up
          </Button>
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
