import { useMemo, forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemText
} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

import { WORKSPACE_DESELECTED } from "../store/actions";

const useStyles = makeStyles((theme) => ({
  title: { marginBottom: theme.spacing(4) },
  list: {
    backgroundColor: grey[200],
    marginBottom: theme.spacing(4)
  }
}));

function ListItemLink(props) {
  const { text, to } = props;

  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemText primary={text} />
      </ListItem>
    </li>
  );
}

function Intro(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const workspaces = useSelector((state) => state.workspace.list);

  // Lifecycle
  useEffect(() => {
    dispatch({ type: WORKSPACE_DESELECTED });
  }, []);

  return (
    <>
      <Typography variant="h5" component="h2" className={classes.title}>
        Welcome, John Doe.
      </Typography>
      <Typography paragraph>Please select a Workspace:</Typography>
      <List
        className={classes.list}
        subheader={<ListSubheader>Favorites</ListSubheader>}
      >
        {workspaces?.map((ws) => (
          <ListItemLink
            to="/workspace/2"
            key={ws.id}
            text={ws.name}
          ></ListItemLink>
        ))}
      </List>
      <Typography variant="body2" paragraph style={{ opacity: 0.5 }}>
        (All redirect to Workspace "2")
      </Typography>
    </>
  );
}

export default Intro;
