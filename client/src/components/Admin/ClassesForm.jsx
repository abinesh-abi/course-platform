import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { useEffect, useState } from "react";
import SelectCourse from "../comon/SelectCourse";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ClassesForm({updateList}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [allCourses, setAllCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')

  useEffect(()=>{
    getDataAPI('/get_course_list')
    .then(({data})=>{
      setAllCourses(data.courses)
    })
  },[])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (value) => {
    if(!selectedCourse)return setError('Chose Any one of the course')
    postDataAPI("/admin/addClass", {...value,course:selectedCourse})
      .then(({ data }) => {
        console.log(data,'data---------------')
        // if (data.status) {
        //   updateList((state) => [data?.course, ...state]);
          handleClose();
        // } else setError(data.message);
      })
      .catch((err) => setError(err.message));
  };
  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ background: "green" }}
      >
        Add Class
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Add new Class
              </Typography>
              <Typography paddingTop={"2px"} color={"error"}>
                {error}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
              >
                <Typography paddingTop={"2px"}>Enter Class Name</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type={"text"}
                  id="name"
                  label="Class Name"
                  name="name"
                  autoFocus
                  {...register("title", {
                    required: true,
                    pattern: /[a-zA-Z_-]$/gi,
                  })}
                />
                <Typography paddingTop={"2px"} color={"error"}>
                  {errors.title?.type === "required" && "Class Name is required"}
                  {errors.title?.type === "pattern" && "Enter valied Charecters"}
                </Typography>

                {/* selct course dropdown */}
                <SelectCourse
                  setSelectedCourse={setSelectedCourse}
                  allCourses={allCourses}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type={"text"}
                  id="description"
                  label="Class description"
                  name="description"
                  autoFocus
                  {...register("description", {
                    required: true,
                    pattern: /[a-zA-Z_-]$/gi,
                  })}
                />
                <Typography paddingTop={"2px"} color={"error"}>
                  {errors.description?.type === "required" && "Class Name is required"}
                  {errors.description?.type === "pattern" && "Enter valied Charecters"}
                </Typography>

                <Typography paddingTop={"2px"}>Choose the date</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type={"date"}
                  id="date"
                  name="date"
                  {...register("date", {
                    required: true,
                  })}
                />
                <Typography paddingTop={"2px"} color={"error"}>
                  {errors.date?.type === "required" && "Please Choose the Date"}
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </Box>
  );
}
