import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import AdminHome from "./components/Admin/AdminHome";
import { Box } from "@mui/system";
import AdminSidbar from "./components/Admin/AdminSidbar";
import Applications from "./components/Admin/Applications";
import Signup from "./pages/Singup";
import { refreshToken } from "./redux/actions/userActions";
import { useEffect } from "react";
import Classes from "./components/Admin/Classes";
import Booked from "./components/Admin/Booked";

function App() {
  const isAdmin = window.location.pathname.split("/").includes("admin");
  const { user } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
    // dispatch(adminRefreshToken());
  }, [dispatch]);

  return isAdmin ? (
    <Admin />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user.token ? <Home /> : <Login />}></Route>
        <Route
          path="/login"
          element={ user.token ? <Home /> : <Login />}
        ></Route>
        <Route path="/signup" element={ <Signup />}></Route>

        {/* admin */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

///////////////////////////////////////

const drawerWidth = 240;
function Admin() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <BrowserRouter>
          <AdminSidbar drawerWidth={drawerWidth} />
          <Routes>
            <Route path="/admin" element={<AdminHome />}></Route>
            <Route path="/admin/applications" element={<Applications drawerWidth={drawerWidth} />}></Route>
            <Route path="/admin/classes" element={<Classes />}></Route>
            <Route path="/admin/booked" element={<Booked />}></Route>

          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}
