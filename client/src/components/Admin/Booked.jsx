import { Box, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getDataAPI } from "../../utils/fetchData";
import ClassesForm from "./ClassesForm";
import ExportToExcel from "../comon/ExportToExcel";

export default function Booked({ drawerWidth }) {
  const [classes, setClasses] = useState([]);
  const columns = [
    { field: "id", headerName: "NO", width: 70, flex: 1 },
    { field: "title", headerName: "Title", width: 70, flex: 1 },
    { field: "course", headerName: "Course", width: 70, flex: 1 },
    { field: "userName", headerName: "Name", width: 70, flex: 1 },
    { field: "email", headerName: "Email", width: 70, flex: 1 },
    {
      field: "date",
      headerName: "Date",
      width: 70,
      flex: 1,
      valueFormatter: ({ value }) => new Date(value).toDateString(), },
  ];


  useEffect(() => {
    getDataAPI("/admin/getBookedClasses").then(({ data }) => {
      if (data.status) {
        setClasses(
          data.bookeItems.map((val, id) => {
            return { ...val, id: id + 1 };
          })
        );
      }
    });
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {/* add course form */}
          <ClassesForm />
        </Box>
        <div style={{ height: 400, width: "100%" }}>
       {/* <ExportToExcel  */}
       <ExportToExcel apiData={classes} fileName={'booked'} />
          <DataGrid
            density="comfortable"
            rows={classes}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Box>
    </>
  );
}



