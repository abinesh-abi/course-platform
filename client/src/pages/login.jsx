import React, { useEffect,} from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { login, refreshToken } from "../redux/actions/userActions";
import { useForm } from "react-hook-form";

const theme = createTheme();

function Login() {
  // function refresh() {
  //   axios.post(
  //     "http://127.0.0.1:5000/refresh_token",
  //     {},
  //     {
  //       withCredentials: true,
  //       credentials: 'include'
  //     }
  //   ).then(({data})=>console.log(data))
  // }

  // const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    dispatch(refreshToken());
    // dispatch(adminRefreshToken());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography paddingTop={"2px"} color={"error"}>
            {user.error}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
              })}
            />
            <Typography paddingTop={"2px"} color={"error"}>
              {errors.email?.type === "required" && "Email is required"}
              {errors.email?.type === "pattern" && "Enter valied Email"}
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: true,
                minLength: 4,
                maxLength: 20,
              })}
            />
            <Typography paddingTop={"2px"} color={"error"}>
              {errors.password?.type === "required" && "Password is required"}
              {errors.password?.type === "minLength" &&
                "Password must morethan or equal to 4 digit"}
              {errors.password?.type === "maxLength" &&
                "Password must less than 20 digit"}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
