import React, { useEffect, useState } from "react";
import Axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const Income = ({ history, location }) => {
  const [income, setIncome] = useState();
  const [spendingLimit, setSpendingLimit] = useState();
  const [id, setId] = useState()
  const [showForm, setShowForm] = useState(false)
  useEffect(async () => {
    try {
      
        const response = await Axios.get(
          "http://localhost:8000/monthly-income",
          {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("app-token"),
            },
          },
        );
        if(response.data.result && location?.state?.fromLogin){
          history.push('/home');
        } else if(response.data.result){
          if(location?.state?.isUpdate){
            setIncome(response.data.result.value);
            setSpendingLimit(response.data.result.spendingLimit);
            setId(response.data.result.id)
            setShowForm(true);
            location.state.isUpdate = false; 
          }else {
            setShowForm(true);
          }
        }
        else{
          setShowForm(true);
        }
    } catch (e) {
      console.log(e);
    }
  })

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(id) {
        await Axios.put(
          "http://localhost:8000/monthly-income",
          { value: income, spendingLimit },
          {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("app-token"),
            },
          },
        );
      }else {
        await Axios.post(
          "http://localhost:8000/monthly-income",
          { value: income, spendingLimit },
          {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("app-token"),
            },
          },
        );
      }
      
      history.push('/home');
    } catch (e) {
      console.log(e);
    }
  }

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "70px auto",
  };
  const avatarStyle = { backgroundColor: "#FFC000" };
  const btnstyle = { margin: "30px 0" };

  return (
    <div>
      {showForm && (
        <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AttachMoneyIcon />
            </Avatar>
            <h2>Renda</h2>
          </Grid>
          <Stack component="form" spacing={2}>
            <TextField
              label="Renda Mensal"
              variant="standard"
              fullWidth
              required
              value={income}
              placeholder="Insira sua renda mensal"
              type="text"
              onChange={(e) => setIncome(e.target.value)}
            />
            <TextField
              label="Limite de Gastos"
              variant="standard"
              fullWidth
              required
              value={spendingLimit}
              placeholder="Insira seu limite de gastos"
              type="text"
              onChange={(e) => setSpendingLimit(e.target.value)}
            />
            <Button
              type="button"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              onClick={handleSubmit}
            >
              Salvar
            </Button>
          </Stack>
        </Paper>
      </Grid>) }
    </div>    
  );
};
export default Income;
