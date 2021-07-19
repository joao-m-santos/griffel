import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Container, LinearProgress } from "@material-ui/core";

import Navbar from "./components/Navbar";
import Intro from "./views/Intro";
import Workspace from "./views/Workspace";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4)
  }
}));

function App(props) {
  const classes = useStyles();

  const isLoading = useSelector((state) => state.app.loading);

  return (
    <>
      <Navbar></Navbar>
      {isLoading && <LinearProgress />}

      <Container className={classes.container}>
        <Switch>
          <Route path="/workspace/:id">
            <Workspace></Workspace>
          </Route>
          <Route path="/">
            <Intro></Intro>
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
