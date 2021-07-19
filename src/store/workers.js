import { call, put, select } from "redux-saga/effects";

import service from "../api/service";

export const getWorkspaceFromList = (state, id) => {
  const workspace = state.workspace.list?.find((ws) => ws.id === id);
  return workspace;
};

/**
 * Finds and select the workspace matching the provided ID.
 *
 * @param { { type: string, payload: any} } action A Redux action.
 */
export function* selectWorkspace(action) {
  try {
    const workspace = yield select(getWorkspaceFromList, action.payload);

    workspace
      ? yield put({ type: "WORKSPACE_SELECTED", payload: workspace })
      : yield put({ type: "WORKSPACE_DESELECTED" });
  } catch (error) {
    yield put({ type: "WORKSPACE_DESELECTED" });
  }
}

/**
 * Fetches the trainings for the provided workspace ID.
 *
 * @param { { type: string, payload: any} } action A Redux action.
 */
export function* fetchTrainings(action) {
  try {
    yield put({ type: "SET_LOADING", payload: true });

    const trainings = yield call(
      service.getTrainingsByWorkspace,
      action.payload
    );

    yield put({ type: "TRAININGS_FETCH_SUCCEEDED", payload: trainings });
    yield put({ type: "SET_LOADING", payload: false });
  } catch (e) {
    yield put({ type: "TRAININGS_FETCH_FAILED", message: e.message });
    yield put({ type: "SET_LOADING", payload: false });
  }
}
