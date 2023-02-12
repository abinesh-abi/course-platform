import React from "react";
import Pdf from "react-to-pdf";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExportToPdf({ data }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Export To PDF
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Export as pdf
            </Typography>
            <Pdf targetRef={ref} filename="booked.pdf">
              {({ toPdf }) => (
                <Button
                  variant="outlined"
                  sx={{ color: "white" }}
                  onClick={() => {
                    toPdf();
                    handleClose();
                  }}
                >
                  Generate Pdf
                </Button>
              )}
            </Pdf>
          </Toolbar>
        </AppBar>
        <PdfTable reff={ref} data={data} />
      </Dialog>
    </div>
  );
}

/////////////////////////////////
// pdf table

function PdfTable({ reff, data }) {
  let options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <div
        ref={reff}
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
        //   options={options}
        //   scale={1} x={1} y={1}
      >
        <TableContainer component={Paper} sx={{ width: "90%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.course}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{new Date(row.date).toDateString()}</TableCell>
                  <TableCell>{row.userName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
