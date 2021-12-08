import React, { useEffect, useState } from "react";
import DrawerLeft from "../components/drawer";
import PieChartCustom from "../components/pieChartCustom";
import DenseTable from "../components/listexpenses";
import { paperStyle } from "../style";
import Axios from "axios";
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from "@mui/material";

function Home(props) {
  const [rows, setRows] = useState([]);
  const [chartsData, setChartsData] = useState(null);

  useEffect(async () => {
    await Axios.get(
      "https://controlei-api.glitch.me/expenses",
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("app-token"),
        },
      },
    ).then((response) => {
      const { data } = response;
      console.log(data)
      if (data) {
        setRows(data.result);
      }
    });
    await Axios.get(
      "https://controlei-api.glitch.me/home",
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("app-token"),
        },
      },
    ).then((response) => {
      const { data } = response;
      console.log(data)
      if (data) {
        setChartsData(data.result);
      }
    });
  }, [])


  const deleteExpense = (expense) => {
    Axios.delete(
      "https://controlei-api.glitch.me/expenses",
      {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("app-token"),
        },
        data: { id: expense.id },
      },
    ).then((response) => {
      document.location.reload(true);
    });
  }

  return (
    <div>
      {/* <Paper elevation={20} style={paperStyle}> */}
        <DrawerLeft {...props} />
        <Fab color="primary" aria-label="add" sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}>
          <AddIcon onClick={() => props.history.push({ pathname: "/despesa" })} />
        </Fab>
        <Grid container spacing={2} align="center" sx={{ margin: '0 auto', width: '100% !important' }}>
          <Grid xs={6} align="center" sx={{ margin: '0 auto' }}>
            {chartsData !== null && (
              <Grid align="center">
                <h3>Renda Mensal</h3>
                <p>{`R$ ` + chartsData.monthlyIncome.toFixed(2)}</p>
              </Grid>
            )}
            {chartsData !== null && (
              <PieChartCustom data={[chartsData.totalExpenses, (chartsData.monthlyIncome - chartsData.totalExpenses)]} />
            )}
            {chartsData !== null && (
              <Grid align="center">
                <h3>Saldo Disponível</h3>
                <p>{`R$ ` + (chartsData.monthlyIncome - chartsData.totalExpenses).toFixed(2)}</p>
              </Grid>
            )}
          </Grid>
          <Grid xs={6} align="center">
            {chartsData !== null && (
              <Grid align="center">
                <h3>Limite de Gastos</h3>
                <p>{`R$ ` + chartsData.spendingLimit.toFixed(2)}</p>
              </Grid>
            )}
            {chartsData !== null && (
              <PieChartCustom data={[chartsData.totalExpenses, (chartsData.spendingLimit - chartsData.totalExpenses)]} />
            )}
            {chartsData !== null && (
              <Grid align="center">
                <h3>Limite Disponível</h3>
                <p>{`R$ ` + (chartsData.spendingLimit - chartsData.totalExpenses).toFixed(2)}</p>
              </Grid>
            )}
          </Grid>
          {chartsData !== null && (
            <Grid xs={12} align="center" mb={"5px"}>
              <Typography variant="h5">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(chartsData.totalExpenses)}</Typography>
              <Typography variant="subtitle1">Valor Gasto</Typography>
              {/* <AddCircleOutlineIcon onClick={() => props.history.push({ pathname: "/despesa" })} /> */}
            </Grid>
          )}
        </Grid>
        {rows && (<DenseTable rows={rows} onDelete={deleteExpense} {...props} />)}
        
      {/* </Paper> */}
    </div>
  );
}
export default Home;
