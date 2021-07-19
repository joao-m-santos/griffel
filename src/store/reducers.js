import { combineReducers } from "redux";

import {
  SET_LOADING,
  WORKSPACE_SELECTED,
  WORKSPACE_DESELECTED,
  TRAININGS_FETCH_SUCCEEDED,
  TRAININGS_FETCH_FAILED
} from "./actions";

const mockWorkspaces = [
  { id: "1", name: "My Workspace #1" },
  { id: "2", name: "My Workspace #2" }
];

const initial = {
  app: {
    loading: false
  },
  workspace: {
    list: mockWorkspaces,
    current: null,
    trainings: null
  }
};

function app(state = initial.app, { type, payload }) {
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
}

function workspace(state = initial.workspace, { type, payload }) {
  switch (type) {
    case WORKSPACE_SELECTED:
      return { ...state, current: payload };
    case WORKSPACE_DESELECTED:
      return { ...state, current: null };
    case TRAININGS_FETCH_SUCCEEDED:
      return { ...state, trainings: payload };
    case TRAININGS_FETCH_FAILED:
      return { ...state, trainings: null };
    default:
      return state;
  }
}

export default combineReducers({ app, workspace });
