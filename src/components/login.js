import React, { useState } from "react";
import Axios from "axios";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { setLogin, setUserName } from "../routes/token";

const Login = ({ history }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      setLogin(response.data.token);
      setUserName(response.data.username);
      history.push({pathname:"/renda", state: { fromLogin: true}});
    } catch (e) {
      console.log("Erro no login");
    }
  }

  const paperStyle = { padding: 20, width: 300, height: 500, margin: "30px auto" };
  const avatarStyle = { backgroundColor: "#FFC000" };
  const btnstyle = { margin: "30px 0" };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Entrar</h2>
        </Grid>
        <Box>
          <Stack component="form" spacing={2}>
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              required
              placeholder="Insira seu email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              variant="standard"
              fullWidth
              required
              placeholder="Insira sua senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              onClick={handleLogin}
            >
              Entrar
            </Button>
          </Stack>
        </Box>
        <Typography>
          {"Não tem uma conta? "}
          <Link onClick={() => history.push("/cadastrar")}>
            Cadastre-se
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default Login;
