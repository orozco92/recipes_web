import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { useState, FormEvent } from "react";

export function ChangeProfilePassword({ ...props }) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
  };
  return (
    <Stack spacing={1} component={"form"} onSubmit={handleSubmit}>
      <Typography variant="h4">Password</Typography>
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
      <Button type="submit" variant="contained" disableElevation>
        Update password
      </Button>
    </Stack>
  );
}
