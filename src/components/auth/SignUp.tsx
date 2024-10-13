import {
  Avatar,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { blue } from "@mui/material/colors";
import { signup } from "../../services/auth";
import { SignUpDto } from "../../core/interfaces";
import { useNavigate } from "react-router-dom";
import { useValidationErrors } from "../../hooks/useValidationErrors";
import { PasswordTextField } from "../utils/PasswordTextField";

export function SignUp() {
  const navigate = useNavigate();

  const { errors, setValidationError } = useValidationErrors();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const dto = Object.fromEntries(formData) as unknown as SignUpDto;

    signup(dto)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        setValidationError(err);
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
          <PasswordTextField
            id="password"
            name="password"
            label="Password"
            error={!!errors["password"]}
            helperText={errors["password"]}
          />
          <PasswordTextField
            id="repeatPassword"
            name="repeatPassword"
            label="Repeat password"
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
