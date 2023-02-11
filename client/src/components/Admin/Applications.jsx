import { Box, Toolbar } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70,flex:1 },
  { field: "firstName", headerName: "First name",flex:1, width: 130 },
  { field: "lastName", headerName: "Last name", flex: 1, minWidth: 160 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    flex: 1,
    minWidth: 160,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    minWidth: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cerseiasdfasdfsddddddddddddd",
    age: 42,
  },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: "hello", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function Applications({ drawerWidth }) {
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
            rows={rows}
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
