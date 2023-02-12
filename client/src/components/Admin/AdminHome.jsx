import React, { useEffect, useState } from "react";

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
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CourseForm from "./CourseForm";
import { deleteDataAPI, getDataAPI } from "../../utils/fetchData";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function AdminHome({ drawerWidth }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getDataAPI("/admin/getCourses").then(({ data }) => setRows(data));
  }, []);

  function removeCourse(id) {
    let remove = window.confirm("Are you realy want to remove this course");
    if (remove) {
      deleteDataAPI("/admin/removeCourse/" + id).then(({ data }) => {
        setRows(val=>val.filter(dt=>dt._id !== data._id))
      });
    }
  }

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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {/* add course form */}
          <CourseForm updateList={setRows} />
        </Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="right">Courses Name</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeCourse(row._id)}
                    >
                      remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
export default AdminHome;
