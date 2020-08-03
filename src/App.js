import React from "react";
import navLogo from "./images/logo-lemur.PNG";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import EditSurvey from "./Admin/EditSurvey/EditSurvey";
import SurveyResults from "./Admin/SurveyResults/SurveyResults";
import TakeSurvey from "./Display/TakeSurvey";
import Home from "./Display/Home";
import StickyFooter from "./Footer";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import themeA from "./themeA";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <ThemeProvider theme={themeA}>
        <CssBaseline />
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Box className={classes.menuButton} component={Link} to="/">
                <img src={navLogo} className="logo" alt="logo" />
              </Box>
              <Typography variant="h6" className={classes.title}></Typography>
              <Button className="nav-item" component={Link} to="/edit">
                Edit
              </Button>
              <Button className="nav-item" component={Link} to="/results">
                Results
              </Button>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route path="/edit">
              <EditSurvey />
            </Route>
            <Route path="/results">
              <SurveyResults />
            </Route>
            <Route path="/survey">
              <TakeSurvey />
            </Route>
            <Route path="">
              <Home />
            </Route>
          </Switch>
        </Router>
        <StickyFooter />
      </ThemeProvider>
    </div>
  );
}
