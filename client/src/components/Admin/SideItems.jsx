import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Courses from "@mui/icons-material/ImportContacts";
import Users from "@mui/icons-material/PeopleAltRounded";
import Classes from '@mui/icons-material/School';
import Booked from '@mui/icons-material/CreditScore';



import { useNavigate } from "react-router-dom";

function Sideitems() {
  let course = <Courses />;
  let users = <Users />;
  let classes = <Classes />
  let booked = <Booked />
  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        <SideElem content={"Course"} icon={course} link='/admin' />
        <SideElem content={"Applicants"} icon={users} link="/admin/applications" />
        <SideElem content={"Classes"} icon={classes} link="/admin/classes" />
        <SideElem content={"Booked Classes"} icon={booked} link="/admin/booked" />
      </List>
    </>
  );
}

export default Sideitems;


///////////////////////

function SideElem({ content, icon ,link}) {
    const navigae = useNavigate()
    function openLink(e){
        e.preventDefault()
        navigae(link)
    }
  return (
      <ListItem disablePadding onClick={openLink}>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={content}/>
        </ListItemButton>
      </ListItem>
  );
}
