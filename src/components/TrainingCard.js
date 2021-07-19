import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, CardContent, Typography, Chip } from "@material-ui/core";
import { AccountCircle, Room } from "@material-ui/icons";
import grey from "@material-ui/core/colors/grey";

import { STATUS } from "../util";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2)
  },
  header: {},
  organizer: {},
  organizerIcon: {
    marginRight: "0.25rem"
  },
  info: {
    display: "inline-grid",
    gridTemplateColumns: "1fr auto",
    columnGap: theme.spacing(1)
  },
  faded: {
    color: grey[700]
  }
}));

function TrainingCard(props) {
  const classes = useStyles();

  const {
    organizer,
    name,
    status,
    description,
    registrations,
    maxRegistrations,
    tickets,
    revenue,
    sessions
  } = props;

  // Helpers

  /**
   * Reduces a session list intro a list of session locations.
   *
   * @param { Array<Session> } sessions A list of training sessions.
   * @returns A list of session locations.
   */
  const _getLocations = (sessions) => {
    if (!sessions) return null;

    return sessions.reduce((acc, curr) => {
      if (curr.venue && curr.venue.name) return [...acc, curr.venue.name];
      return acc;
    }, []);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          mb={1}
        >
          <Box>
            <Box
              className={classes.organizer}
              display="flex"
              alignItems="center"
            >
              <AccountCircle
                fontSize="small"
                className={classes.organizerIcon}
              />
              <Typography variant="body2">{organizer}</Typography>
            </Box>
            <Typography variant="h6" component="h4">
              {name}
            </Typography>
          </Box>
          <Chip
            color={status === "planned" ? "primary" : "default"}
            label={STATUS[status]}
          />
        </Box>
        <Box>
          {description && (
            <Typography
              variant="body2"
              className={classes.faded}
              noWrap
              paragraph
            >
              {description}
            </Typography>
          )}
          <Box display="flex" alignItems="center">
            <Box className={classes.info}>
              <Typography variant="body2" className={classes.faded}>
                Registrations
              </Typography>
              <Typography variant="body2">
                {registrations}
                {maxRegistrations && (
                  <span className={classes.faded}>/{maxRegistrations}</span>
                )}
              </Typography>
              <Typography variant="body2" className={classes.faded}>
                Tickets
              </Typography>
              <Typography variant="body2">{tickets.length}</Typography>
              <Typography variant="body2" className={classes.faded}>
                Revenue
              </Typography>
              <Typography variant="body2">${revenue}</Typography>
            </Box>
            <Box display="flex" alignItems="center" ml={2}>
              <Room></Room>
              <Typography>
                {_getLocations(sessions).length
                  ? _getLocations(sessions).join(",")
                  : "Online"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TrainingCard;
