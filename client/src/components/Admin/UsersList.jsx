import {
  Box,
  Toolbar,
  TableBody,
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useEffect } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(no, name, email, course) {
//   return { no, name, email, course };
// }

// const rows = [
//   { no: 1, name: "Abi", email: "abi@gmail.com", course: "MERN Stack" },
//   { no: 1, name: "Abi", email: "abi@gmail.com", course: "MERN Stack" },
//   { no: 1, name: "Abi", email: "abi@gmail.com", course: "MERN Stack" },
// ];

function UsersList({ drawerWidth }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows([
      { no: 1, name: "Abi", email: "abi@gmail.com", course: "MERN Stack" },
      { no: 1, name: "Abi", email: "abi@gmail.com", course: "MERN Stack" },
      { no: 1, name: "Abi", email: "abi@gmail.com", course: "MERN Stack" },
    ]);
  }, []);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Courses</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.no}>
                  {console.log(row.no)}
                  <TableCell>{row.no}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.course}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default UsersList;
