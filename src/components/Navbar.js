import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Divider,
  Typography,
  Avatar,
  Box
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 56
  },
  logo: {
    fontSize: "0.875rem",
    fontWeight: 700,
    color: "inherit",
    textDecoration: "none",
    marginRight: theme.spacing(2)
  },
  divider: {
    height: "1.75rem",
    alignSelf: "center",
    marginRight: theme.spacing(2)
  },
  subtitle: {
    fontSize: "0.625rem",
    lineHeight: 1
  },
  workspaceTitle: {
    fontWeight: 700,
    lineHeight: 1.15
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginLeft: "auto"
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const workspace = useSelector((state) => state.workspace.current);

  return (
    <AppBar position="static">
      <Toolbar variant="dense" className={classes.toolbar}>
        <Typography
          variant="h1"
          className={classes.logo}
          component={Link}
          to="/"
        >
          griffel
        </Typography>

        {workspace && (
          <>
            <Divider
              orientation="vertical"
              flexItem
              className={classes.divider}
            />
            <Box>
              <Typography className={classes.subtitle}>Workspace</Typography>
              <Typography className={classes.workspaceTitle} variant="body2">
                {workspace.name}
              </Typography>
            </Box>
          </>
        )}

        <Avatar alt="User" className={classes.avatar} />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
