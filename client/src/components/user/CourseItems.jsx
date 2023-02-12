import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { postDataAPI } from "../../utils/fetchData";
import { useSelector } from "react-redux";

function CourseItems({ title, description, date ,_id}) {
  date = new Date(date).toDateString()
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.DPFdk5otPXM70c0w5tZAqQHaDp%26pid%3DApi&f=1&ipt=0ad0f64253c7dfc861714b204472ddf231ff47f99e960025e6ec69684ba04982&ipo=images"
          alt="course"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body1" marginTop={"10px"}>
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <ConfirmBooking title={title} date={date} id={_id}/>
        {/* <Button size="small" variant="contained" color="primary">
          View
        </Button> */}
      </CardActions>
    </Card>
  );
}

export default CourseItems;


/////////////////////////////////
// confirm booking

function ConfirmBooking({ title, date ,id}) {
  const { user } = useSelector((state) => state);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function bookCourse(){
    postDataAPI('/bookClass/'+id,{id:user.user._id})
    .then(({data})=>console.log(data))
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Book Course
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Booking"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to book the <b>{title}</b> class on <b>{date}</b> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={bookCourse} autoFocus>
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
