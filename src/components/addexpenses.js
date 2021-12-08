import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Axios from "axios";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Input from "@mui/material/Input";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Portal from '@mui/material/Portal'
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DateAdapter from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment'

const AddExpenses = ({ location, history }) => {
  const detail = location?.state?.detail;
  const [id, setId] = useState();
  const [value, setValue] = useState();
  const [description, setDescription] = useState();
  const [typeId, setTypeId] = useState(detail ? detail.typeid : null);
  const [repeat, setRepeat] = useState(false);
  const [monthlyRepetitions, setMonthlyRepetitions] = useState();
  const [dueDate, setDueDate] = useState(null);
  const [show, setShow] = useState(false);
  const container = useRef(null);

  useEffect(()=>{
    if(detail) {
      setId(detail.id);
      setValue(detail.value);
      setDescription(detail.description);
      setTypeId(detail.typeid);
      setRepeat(detail.repeat);
      setMonthlyRepetitions(detail.monthlyrepetitions);
      setDueDate(detail.duedate);
    }
  },[])
    
  const handleClick = () => {
    setShow(!show);
    setRepeat(!repeat);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(id) {
        const response = await Axios.put(
          "http://localhost:8000/expenses",
          { id, value, description, typeId, repeat, monthlyRepetitions, dueDate: dueDate ? moment(dueDate).format() : null },
          {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("app-token"),
            },
          },
        );
      } else {
        const response = await Axios.post(
          "http://localhost:8000/expenses",
          { value, description, typeId, repeat, monthlyRepetitions, dueDate: dueDate ? moment(dueDate).format() : null },
          {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("app-token"),
            },
          },
        );
      }
      history.push('/home');
    } catch (e) {
      console.log(e.message);
    }
  }

  const NumberCustom = React.forwardRef((props, ref) => {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: 'value',
              value: values.formattedValue,
            },
          });
        }}
        thousandSeparator="."
        isNumericString
        // prefix="R$ "
        decimalSeparator=","
        allowNegative={false}
        decimalScale={2}
      />
    );
  });

  NumberCustom.propTypes = {
    name: 'value',
    onChange: PropTypes.func.isRequired,
  };

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: "30px auto",
  };
  const avatarStyle = { backgroundColor: "#FFC000" };
  const btnstyle = { margin: "20px 0" };

  return (

    <Box >
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AttachMoneyIcon />
          </Avatar>
          <h2>Adicionar Despesa</h2>
        </Grid>
        <Stack component="form" spacing={2}>
          <TextField
            label="R$"
            variant="standard"
            type="number"
            required
            sx={{
              typography: {
                fontSize: 24,
                htmlFontSize: 30
              }
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
           /*  InputProps={{
              inputComponent: NumberCustom,
            }} */
          />
          <TextField
            label="Descrição"
            variant="standard"
            fullWidth
            required
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <FormControl variant="standard" fullWidth required margin="normal">
            <InputLabel color='primary' id="typeId" >Categoria</InputLabel>
            <Select
              labelId="typeId"
              id="select-typeId"
              label="Categoria"
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
            >
              <MenuItem value={4}>Geral</MenuItem>
              <MenuItem value={1}>Alimentacao</MenuItem>
              <MenuItem value={3}>Lazer</MenuItem>
              <MenuItem value={5}>Moradia</MenuItem>
              <MenuItem value={2}>Transporte</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <LocalizationProvider dateAdapter={DateAdapter} fullWidth >
              <DatePicker
                label="Vencimento"
                value={dueDate}
                inputFormat="DD/MM/YYYY"
                showTodayButton={true}
                onChange={(newDueDate) => {
                  setDueDate(newDueDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <FormControlLabel
              control={
                <Switch checked={repeat} onChange={handleClick} name="repeat" color="primary"
                  {...show ? 'Unmount children' : 'Mount children'} />
              } label="Repetir Mensalmente"
            />
            <Box>
              {repeat ? (
                <Portal container={container.current}>
                  <TextField
                    label="Quantidade de vezes"
                    variant="standard"
                    fullWidth
                    type="number"
                    value={monthlyRepetitions}
                    onChange={(e) => setMonthlyRepetitions(e.target.value)}
                  />
                </Portal>
              ) : null}
            </Box>
            <Box fullWidth ref={container} />
          </FormControl>
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
    </Box>
  );
};
export default AddExpenses;
