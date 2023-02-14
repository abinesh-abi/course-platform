import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import Logout from "../components/user/Logout";
import { useSelector } from "react-redux";
import CourseItems from "../components/user/CourseItems";

import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";

function Home({ drawerWidth }) {
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const { user } = useSelector((state) => state);
  const [pickDate, setpickDate] = useState(null);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton> */}
            <Typography variant="h6" noWrap component="div">
              Welcome{" "}
              <Typography
                variant="subtitle"
                fontStyle={"italic"}
                color={"aqua"}
              >
                {user.user.name}
              </Typography>
            </Typography>
            {/* logout */}
            <Logout />
          </Toolbar>
        </AppBar>
      </Box>

      <Box>
        <Toolbar />
        <Box
          display={"flex"}
          justifyContent="center"
          marginTop={"40px"}
          marginBottom="2px"
        >
          <Box>
            <Typography variant="h4">
              {user.user.courseDetails?.name}
            </Typography>
            {/* date pic */}
            {pickDate ? (
              <Button
                onClick={() => setpickDate(null)}
                variant="outlined"
                color="error"
              >
                Clear Date <ClearIcon />
              </Button>
            ) : (
              <DatePicker setpickDate={setpickDate} />
            )}
          </Box>
        </Box>
        <Container maxWidth="lg">
          <Typography variant="h5" margin={"10px"}>
            Booked Courses
          </Typography>
          <Grid container gap={3}>
            {pickDate &&
              user.user.classes.map((val, i) => {
                return (
                  new Date(pickDate).toDateString() ===
                    new Date(val.date).toDateString() && (
                    <CourseItems key={i} {...val} booked={user.user.booked} />
                  )
                );
              })}
            {!pickDate &&
              user.user.classes.map((val, i) => {
                return (
                  <CourseItems key={i} {...val} booked={user.user.booked} />
                );
              })}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default Home;

function DatePicker({ setpickDate }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ marginTop: "10px" }}
        onClick={handleOpen}
      >
        Choose Date
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              minDate={dayjs(
                new Date(Date.now()).toLocaleDateString().split("/").join("-")
              )}
              onChange={(newValue) => {
                setpickDate(newValue.toISOString());
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Modal>
    </div>
  );
}
