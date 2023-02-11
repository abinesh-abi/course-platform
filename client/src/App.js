import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import AdminHome from "./components/Admin/AdminHome";
import { Box } from "@mui/system";
import AdminSidbar from "./components/Admin/AdminSidbar";
import UsersList from "./components/Admin/UsersList";
import Applications from "./components/Admin/Applications";

function App() {
  const isAdmin = window.location.pathname.split("/").includes("admin");
  const { user } = useSelector((state) => state);
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
            <Route path="/admin/users" element={<UsersList />}></Route>
            <Route path="/admin/applications" element={<Applications drawerWidth={drawerWidth} />}></Route>
            <Route path="/admin/users" element={<UsersList />}></Route>

          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}
