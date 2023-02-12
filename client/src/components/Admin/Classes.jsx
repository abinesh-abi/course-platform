import { Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import ClassesForm from "./ClassesForm";

function Classes({ drawerWidth }) {
  const [classes, setClasses] = useState([])
  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 1 },
    { field: "name", headerName: "Name", width: 70, flex: 1 },
    { field: "course", headerName: "Course", width: 70, flex: 1 },
    { field: "date", headerName: "Date", width: 70, flex: 1 },

    // {
    //   field: "approved",
    //   headerName: "Approved",
    //   width: 70,
    //   flex: 1,
    //   renderCell: (props) => {
    //     return props.row.approved ? (
    //       <Typography variant="body1" color={"green"}>
    //         Approved
    //       </Typography>
    //     ) : (
    //       <Button variant="contained" onClick={() => approve(props.row._id)}>
    //         Approve
    //       </Button>
    //     );
    //   },
    // },
  ];

  function approve(id) {
    patchDataAPI("/admin/approveUser/" + id).then(({ data }) => {
      if (data.status) {
        setClasses((state) => {
          return state.map((val) => {
            if (val._id === id) {
              return { ...val, approved: true };
            }
            return val;
          });
        });
      }
    });
  }

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
          <ClassesForm />
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
