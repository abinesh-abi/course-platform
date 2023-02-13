import { Box, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getDataAPI } from "../../utils/fetchData";
import ClassesForm from "./ClassesForm";

function Classes({ drawerWidth }) {
  const [classes, setClasses] = useState([]);
  const columns = [
    { field: "id", headerName: "NO", width: 70, flex: 1 },
    { field: "title", headerName: "Title", width: 70, flex: 1 },
    { field: "course", headerName: "Course", width: 70, flex: 1 },
    {
      field: "date",
      headerName: "Date",
      width: 70,
      flex: 1,
      valueFormatter: ({ value }) => new Date(value).toDateString(), },
  ];


  useEffect(() => {
    getDataAPI("/admin/getClasses").then(({ data }) => {
      if (data.status) {
        setClasses(
          data.classes.map((val, id) => {
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
          <ClassesForm updateList={setClasses} />
        </Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            density="comfortable"
            rows={classes}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // checkboxSelection
          />
        </div>
      </Box>
    </>
  );
}

export default Classes;
