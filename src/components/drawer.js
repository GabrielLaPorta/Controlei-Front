import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeIcon from "@mui/icons-material/Home";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { getUserName } from "../routes/token";
import { logout } from "../routes/token"

export default function DrawerLeft(props) {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState(getUserName());

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    props.history.push("/entrar")
  };

  const weekDay = new Array(7);
  weekDay[0] = "Domingo";
  weekDay[1] = "Segunda";
  weekDay[2] = "Terça";
  weekDay[3] = "Quarta";
  weekDay[4] = "Quinta";
  weekDay[5] = "Sexta";
  weekDay[6] = "Sábado";

  const month = new Array();
  month[0] = "Janeiro";
  month[1] = "Fevereiro";
  month[2] = "Março";
  month[3] = "Abril";
  month[4] = "Maio";
  month[5] = "Junho";
  month[6] = "Julho";
  month[7] = "Agosto";
  month[8] = "Setembro";
  month[9] = "Outubro";
  month[10] = "Novembro";
  month[11] = "Dezembro";

  const date = new Date()
  const today = date.getDate() + " de " + month[date.getMonth()] + " de " + date.getFullYear();

  const drawerStyle = {
    backgroundColor: "#6D8EAD",
    height: "100vh",
    color: "#FFF"
  }

  return (
    <MemoryRouter initialEntries={["/home"]} initialIndex={0}>
      <Box sx={{ display: "flex" }}>
        <IconButton onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <Drawer open={open} onClose={handleDrawerClose}  >
          <Container style={drawerStyle}>
            <Box sx={{ padding: "15px" }} >
              <Typography variant="h6" component="div" sx={{ marginTop: "25px" }}>
                Bem vindo,
              </Typography>
              <Typography variant="h6" component="div">
                {username}
              </Typography>
              <Typography sx={{ marginTop: "25px" }}>
                <CalendarTodayIcon fontSize="inherit" />
                {" " + weekDay[date.getUTCDay()]},
              </Typography>
              <Typography sx={{ marginBottom: "25px" }}>
                {today}
              </Typography >
            </Box>
            <Divider />
            <List sx={{ width: "220px" }}>
              <ListItem
                sx={{ cursor: 'pointer' }}
                onClick={() => props.history.push("/entrar")}
              >
                <ListItemIcon >
                  <HomeIcon sx={{ color: "#FFF" }} />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItem>
              <ListItem
                sx={{ cursor: 'pointer' }}
                onClick={() => props.history.push({pathname:"/renda", state: { isUpdate: true}})}
              >
                <ListItemIcon>
                  <LocalAtmIcon sx={{ color: "#FFF" }} />
                </ListItemIcon>
                <ListItemText>Renda</ListItemText>
              </ListItem>
              <ListItem
                sx={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "#FFF" }} />
                </ListItemIcon>
                <ListItemText>Sair</ListItemText>
              </ListItem>
            </List>
          </Container>
        </Drawer>
      </Box>
    </MemoryRouter >
  );
}
