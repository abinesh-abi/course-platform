import { Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";

function Applications({ drawerWidth }) {
  const [applicant, setApplicant] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 1 },
    { field: "name", headerName: "Name", width: 70, flex: 1 },
    { field: "email", headerName: "Email", width: 70, flex: 1 },
    { field: "course", headerName: "Course", width: 70, flex: 1 },
    {
      field: "approved",
      headerName: "Approved",
      width: 70,
      flex: 1,
      renderCell: (props) => {
        return props.row.approved ? (
          <Typography variant="body1" color={"green"}>
            Approved
          </Typography>
        ) : (
          <Button variant="contained" onClick={()=>approve(props.row._id)}>Approve</Button>
        );
      },
    },
  ];

  function approve(id){
    patchDataAPI('/admin/approveUser/'+id)
    .then(({data})=>{
      if(data.status){
        setApplicant(state=>{
          return state.map(val=>{
            if(val._id ===id){
               return {...val,approved:true}
            }  
            return val
          })
        })
      }
    })
  }

  useEffect(() => {
    getDataAPI("/admin/getApplicants").then(({ data }) => {
      if (data.status) {
        setApplicant(
          data.users.map((val, id) => {
            return { ...val, id: id + 1, course: val.courseDetails.name };
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
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            density="comfortable"
            rows={applicant}
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

export default Applications;
