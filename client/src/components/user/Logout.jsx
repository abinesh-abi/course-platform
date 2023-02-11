import { Button } from "@mui/material";
import LogOutIcon from "@mui/icons-material/Logout";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";

function Logout() {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout())
  }
  return (
    <>
      <Button sx={{ color: "white" }} onClick={handleLogout}>
        <LogOutIcon sx={{ color: "white" }} />
        Logout
      </Button>
    </>
  );
}

export default Logout;
