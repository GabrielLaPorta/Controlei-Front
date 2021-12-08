import React, { useState } from 'react'
import Axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const Signup = ({ handleChange, history }) => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [password2, setPassword2] = useState()


  async function handleSubmit(e) {
    e.preventDefault()
    if (password2 === password) {
      try {
        const response = await Axios.post('https://controlei-api.glitch.me/user', { name, email, password })
        history.push("/entrar")
      } catch (e) {
        console.log('Erro no cadastro')
      }
    } else {
      alert('confirme sua senha')
    }
  }

  const paperStyle = { padding: 20, width: 300, height: 500, margin: "30px auto" };
  const avatarStyle = { backgroundColor: "#FFC000" }
  const btnstyle = { margin: '30px 0' }
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle} >
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 >Cadastre-se</h2>
        </Grid>
        <Box>
          <Stack component="form" spacing={2}>
            <TextField variant="standard" fullWidth required label='Nome' placeholder='Insira seu nome' type='text'
              onChange={e => setName(e.target.value)} />
            <TextField variant="standard" fullWidth required label='Email' placeholder='Insira seu email' type='email'
              onChange={e => setEmail(e.target.value)} />
            <TextField variant="standard" fullWidth required label='Senha' placeholder='Insira sua senha' type='password'
              onChange={e => setPassword(e.target.value)} />
            <TextField variant="standard" fullWidth required label='Confirmar Senha' placeholder='Confirme sua senha' type='password'
              onChange={e => setPassword2(e.target.value)} />
            <Button type='button' color='primary' variant='contained' style={btnstyle} fullWidth
              onClick={handleSubmit}> Cadastrar</Button>
          </Stack>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Signup;
