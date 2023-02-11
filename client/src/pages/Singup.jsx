import React, {  useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {  useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getDataAPI, postDataAPI } from "../utils/fetchData";

const theme = createTheme();

function Signup() {

  const { user } = useSelector((state) => state);
  const [allCourses, setAllCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [courseErr, setCourseErr] = useState('')
  const naviagate = useNavigate()

  useEffect(()=>{
    getDataAPI('/get_course_list')
    .then(({data})=>{
      setAllCourses(data.courses)
    })
  },[])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if(!selectedCourse)return setCourseErr('Chose Any one of the course')
    setCourseErr('')
    // dispatch(registerUser({...data,course:selectedCourse}));
    postDataAPI("/register", {...data,course:selectedCourse})
    .then(({data})=>{
      console.log(data,'data---------')
      if(data.status){
        naviagate('/login')
      }
    })
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
            Sign Up
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              {...register("name", {
                required: true,
                pattern: /[a-zA-Z]$/i,
              })}
            />
            <Typography paddingTop={"2px"} color={"error"}>
              {errors.name?.type === "required" && "Name is required"}
              {errors.name?.type === "pattern" && "Enter valied Characters"}
            </Typography>
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

            {/* selct course dropdown */}
            <SelectCourse setSelectedCourse={setSelectedCourse} allCourses={allCourses} />

            <Typography paddingTop={"2px"} color={"error"}>
              {courseErr}
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
                <Link to={"/login"} variant="body2">
                  {"Already have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;

function SelectCourse({ setSelectedCourse ,allCourses }) {
  const [course, setCourse] = useState('')

  const handleChange = (event) => {
    setCourse(event.target.value);
    setSelectedCourse(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={course}
          label="course"
          onChange={handleChange}
        >
          {
            allCourses.map(val=><MenuItem key={val._id} value={val._id}>{val.name}</MenuItem> )
          }
        </Select>
      </FormControl>
    </Box>
  );
}
