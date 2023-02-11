import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Courses from "@mui/icons-material/ImportContacts";
import Users from "@mui/icons-material/PeopleAltRounded";
import Application from '@mui/icons-material/FactCheckRounded';



import { useNavigate } from "react-router-dom";

function Sideitems() {
  let course = <Courses />;
  let users = <Users />;
  let application = <Application/>
  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        <SideElem content={"Course"} icon={course} link='/admin' />
        <SideElem content={"Applications"} icon={users} link="/admin/applications" />
        <SideElem content={"Users"} icon={users} link="/admin/users" />
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
