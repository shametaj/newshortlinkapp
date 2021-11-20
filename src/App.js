import React from "react";
import "./App.css";
import { Input } from "./pages/HomePage/HomePage";
import { TableLocal } from "./pages/AdminPage/AdminPage";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <MuiThemeProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact>
              <Input />
            </Route>
            <Route path="/list" exact>
              <TableLocal />
            </Route>
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
