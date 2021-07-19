import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { compareStrings, STATUS } from "../util";
import { TRAININGS_FETCH_REQUESTED, SELECT_WORKSPACE } from "../store/actions";

import TrainingCard from "../components/TrainingCard";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: theme.spacing(2)
  }
}));

function Workspace(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id } = useParams();

  const trainings = useSelector((state) => state.workspace.trainings);

  // List of statuses (retrieved from training list)
  const [statusList, setStatusList] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // Lifecycle
  useEffect(() => {
    dispatch({ type: SELECT_WORKSPACE, payload: id });
    dispatch({ type: TRAININGS_FETCH_REQUESTED, payload: id });
  }, []);

  useEffect(() => {
    trainings && trainings.length && setStatusList(_getStatusList(trainings));
  }, [trainings]);

  // Helpers

  /**
   * Reduces an array of trainings into an array of different, possible statuses.
   *
   * @param { Array<Training> } trainings A list of trainings.
   * @returns { Array<string> } An array of statuses.
   */
  const _getStatusList = (trainings) => {
    return trainings?.reduce?.(
      (acc, curr) => (acc.includes(curr.status) ? acc : [...acc, curr.status]),
      []
    );
  };

  /**
   * Filters the total trainings by a search term and/or status selection.
   *
   * @param { Array<Training> } trainings A list of trainings.
   * @returns { Array<Training> } A filtered (by name and/or status) list of trainings.
   */
  const _filterTrainings = (trainings) => {
    return trainings.filter((training) => {
      if (search) {
        return compareStrings(training.name, search);
      }

      if (status !== "all") {
        return training.status === status;
      }

      return true;
    });
  };

  // Handlers

  /**
   * Sets the new input value to the respective state property.
   *
   * @param { Event } event The change event.
   * @param { Function } setter The state setter function to call.
   */
  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  return (
    <>
      <Typography variant="h5" component="h2" paragraph>
        Training courses
      </Typography>

      <Box className={classes.header} mb={2}>
        <TextField
          variant="filled"
          size="small"
          label="Search..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="disabled" />
              </InputAdornment>
            )
          }}
          value={search}
          onChange={(ev) => handleChange(ev, setSearch)}
        ></TextField>

        <FormControl variant="filled" size="small">
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            value={status}
            onChange={(ev) => handleChange(ev, setStatus)}
          >
            <MenuItem value="all">All</MenuItem>
            {statusList?.map((st) => (
              <MenuItem value={st} key={st}>
                {STATUS[st]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {trainings
        ? trainings.length
          ? _filterTrainings(trainings).map((training) => (
              <TrainingCard {...training} key={training.id}></TrainingCard>
            ))
          : "No trainings available :("
        : "Loading..."}
    </>
  );
}

export default Workspace;
