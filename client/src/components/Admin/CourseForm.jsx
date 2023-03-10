import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { postDataAPI } from "../../utils/fetchData";
import { useState } from "react";

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

export default function CourseForm({ updateList }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (value) => {
    postDataAPI("/admin/addCourse", value)
      .then(({ data }) => {
        if (data.status) {
          updateList(state=>[data?.course,...state])
          handleClose()
        }else setError(data.message)
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
        Add Course
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
                New Course
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
                <Typography paddingTop={"2px"}>Enter Course Name</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type={"text"}
                  id="name"
                  label="Course Name"
                  name="name"
                  autoFocus
                  {...register("name", {
                    required: true,
                    pattern: /[a-zA-Z_-]$/gi,
                  })}
                />
                <Typography paddingTop={"2px"} color={"error"}>
                  {errors.name?.type === "required" &&
                    "Course Name is required"}
                  {errors.name?.type === "pattern" && "Enter valied Charecters"}
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
