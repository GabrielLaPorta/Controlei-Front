import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"
import Income from "./components/income";
import Home from "./pages/home";
import LandingPage from "./pages/LandingPage";
import Login from "./components/login";
import Signup from "./components/signup";
import PrivateRoute from "./routes/privateRoute";
import PublicRoute from "./routes/publicRoute";
import AddExpenses from "./components/addexpenses";



const history = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <PublicRoute exact restricted={false} component={LandingPage} path="/" />
          <PublicRoute exact restricted={true} component={Login} path="/entrar" />
          <PublicRoute exact restricted={true} component={Signup} path="/cadastrar" />
          <PrivateRoute exact component={Home} path="/home" />
          <PrivateRoute exact component={Income} path="/renda" />
          <PrivateRoute exact component={AddExpenses} path="/despesa" />
          {/* <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/entrar" component={Login}></Route>
          <Route exact path="/cadastrar" component={Signup}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/renda" component={Income}></Route> */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
export default App;
