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


function Home({ drawerWidth }) {
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const { user } = useSelector((state) => state);
  console.log(user,'user---------')

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
        <Box display={"flex"} justifyContent="center" marginTop={"40px"}>
          <Typography variant="h4">{user.user.courseDetails?.name}</Typography>
        </Box>
        <Container maxWidth='lg'>
          <Grid  container gap={3}>
            {user.user.classes.map((val, i) => {
              return <CourseItems key={i} {...val} />;
            })}
          </Grid>
          {console.log(user.user.classes)}
        </Container>
      </Box>
    </div>
  );
}

export default Home;
