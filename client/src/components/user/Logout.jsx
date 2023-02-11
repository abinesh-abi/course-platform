import { Button } from "@mui/material";
import LogOutIcon from "@mui/icons-material/Logout";
import React from "react";

function Logout() {
  function logout() {
    console.log("logout");
  }
  return (
    <>
      <Button sx={{ color: "white" }} onClick={logout}>
        <LogOutIcon sx={{ color: "white" }} />
        Logout
      </Button>
    </>
  );
}

export default Logout;
