import {
  AppBar,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import Logout from "../components/user/Logout";
import { useSelector } from "react-redux";
import CourseItems from "../components/user/CourseItems";

let tempCourse = [
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
  { title: "MongoDB", content: "Basics of mongodb detaild", date: "4/3/43" },
];

function Home({ drawerWidth }) {
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const { user } = useSelector((state) => state);

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
            <Logout />
          </Toolbar>
        </AppBar>
      </Box>

      <Box>
        <Toolbar />
        <Box display={"flex"} justifyContent="center" marginTop={"40px"}>
          <Typography variant="h4">{user.user.course}</Typography>
        </Box>
        <Container maxWidth='lg'>
          <Grid  container gap={3}>
            {tempCourse.map((val, i) => {
              return <CourseItems {...val} />;
            })}
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default Home;
