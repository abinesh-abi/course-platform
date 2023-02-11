import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

  export default function SelectCourse({ setSelectedCourse ,allCourses }) {
  const [course, setCourse] = useState('')

  const handleChange = (event) => {
    setCourse(event.target.value);
    setSelectedCourse(event.target.value)
  };

 return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={course}
          label="course"
          onChange={handleChange}
        >
          {
            allCourses.map(val=><MenuItem key={val._id} value={val._id}>{val.name}</MenuItem> )
          }
        </Select>
      </FormControl>
    </Box>
  );
}
